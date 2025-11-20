function initAdmin(){
  console.log('Admin panel initialized');

  /** State */
  let guests = [];
  let nextId = 1;

  /** Elements */
  const $tbody = document.getElementById('guest-tbody');
  const $import = document.getElementById('file-import');
  const $btnExport = document.getElementById('btn-export');
  const $btnClear = document.getElementById('btn-clear');
  const $btnAdd = document.getElementById('btn-add');
  const $inputName = document.getElementById('input-name');

  console.log('Elements found:', { $tbody, $import, $btnExport, $btnClear, $btnAdd, $inputName });

  /** Helpers */
  const baseDir = (() => {
    try{
      const href = location.href;
      const idx = href.lastIndexOf('/')
      return idx > -1 ? href.slice(0, idx+1) : href;
    }catch{ return './'; }
  })();

  function computeNextId(){
    nextId = guests.length ? Math.max(...guests.map(g=>Number(g.id)||0)) + 1 : 1;
  }

  function render(){
    console.log('Render called with guests:', guests);
    if(!$tbody){
      console.error('tbody element not found');
      return;
    }
    if(!guests.length){
      $tbody.innerHTML = '<tr><td colspan="3" class="muted">Belum ada tamu. Tambahkan atau import JSON.</td></tr>';
      return;
    }
    $tbody.innerHTML = guests.map(g => {
      const id = g.id;
      const name = (g.name||'').replace(/</g,'&lt;');
      return `
        <tr data-id="${id}">
          <td><span class="pill">#${id}</span></td>
          <td>
            <input class="name-input" type="text" value="${name}" />
          </td>
          <td class="actions">
            <button class="btn btn-light act-link" title="Salin tautan">Link</button>
            <button class="btn btn-outline act-save" title="Simpan perubahan">Simpan</button>
            <button class="btn btn-outline act-del" title="Hapus tamu">Hapus</button>
          </td>
        </tr>`;
    }).join('');
  }

  function loadInitial(){
    // Load dari localStorage terlebih dahulu, jika tidak ada baru load dari file
    const stored = localStorage.getItem('wedding-guests');
    if(stored){
      try{
        const data = JSON.parse(stored);
        if(Array.isArray(data)){
          guests = data;
          computeNextId();
          render();
          return;
        }
      }catch(e){
        console.warn('Error loading from localStorage:', e);
      }
    }

    // Fallback ke file JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/guests.json', true);
    xhr.onreadystatechange = function() {
      console.log('XHR readyState:', xhr.readyState, 'status:', xhr.status);
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) { // status 0 untuk file lokal
          try {
            const data = JSON.parse(xhr.responseText);
            console.log('Loaded data from file:', data);
            if(Array.isArray(data)){
              guests = data.map(x => ({ id:x.id, name:x.name }));
              localStorage.setItem('wedding-guests', JSON.stringify(guests)); // Simpan ke localStorage
              computeNextId();
              render();
            }else{
              console.warn('Data is not array:', data);
              guests = [];
              render();
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
            guests = [];
            render();
          }
        } else {
          console.warn('Could not load guests.json, status:', xhr.status);
          guests = [];
          render();
        }
      }
    };
    xhr.send();
  }

  function addGuest(name){
    const n = (name||'').trim();
    if(!n) return;
    guests.push({ id: nextId++, name: n });
    localStorage.setItem('wedding-guests', JSON.stringify(guests));
    render();
  }

  function exportJSON(){
    const blob = new Blob([JSON.stringify(guests, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guests.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function copy(text){
    return navigator.clipboard.writeText(text);
  }

  function buildLinks(id, name){
    const encName = encodeURIComponent(name || '');
    // Base directory of site (admin.html directory). Use relative links.
    const indexUrl = `${baseDir}index.html?id=${encodeURIComponent(id)}`;
    const undanganUrl = `${baseDir}undangan.html?to=${encName}`;
    return { indexUrl, undanganUrl };
  }

  // Events
  $btnAdd?.addEventListener('click', () => {
    addGuest($inputName.value);
    $inputName.value = '';
    $inputName.focus();
  });

  $inputName?.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      addGuest($inputName.value);
      $inputName.value = '';
    }
  });

  $btnExport?.addEventListener('click', exportJSON);

  $btnClear?.addEventListener('click', () => {
    if(confirm('Kosongkan semua tamu?')){
      guests = [];
      localStorage.removeItem('wedding-guests');
      computeNextId();
      render();
    }
  });

  $import?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const data = JSON.parse(String(reader.result||'[]'));
        if(Array.isArray(data)){
          guests = data.map(x => ({ id:x.id, name:x.name }));
          computeNextId();
          render();
        }else{
          alert('Format JSON tidak sesuai (harus array)');
        }
      }catch(err){
        alert('Gagal membaca JSON');
      }
    };
    reader.readAsText(file);
    // reset input agar event change bisa terpicu lagi jika file sama diimport kembali
    e.target.value = '';
  });

  $tbody?.addEventListener('click', (e) => {
    const t = e.target;
    if(!(t instanceof HTMLElement)) return;
    const row = t.closest('tr[data-id]');
    if(!row) return;
    const id = Number(row.getAttribute('data-id'));
    const idx = guests.findIndex(g => Number(g.id) === id);
    if(idx < 0) return;

    if(t.classList.contains('act-save')){
      const input = row.querySelector('input.name-input');
      const val = input && input.value ? input.value.trim() : '';
      if(!val){ alert('Nama tidak boleh kosong'); return; }
      guests[idx].name = val;
      localStorage.setItem('wedding-guests', JSON.stringify(guests));
      render();
    }

    if(t.classList.contains('act-del')){
      if(confirm('Hapus tamu ini?')){
        guests.splice(idx,1);
        localStorage.setItem('wedding-guests', JSON.stringify(guests));
        render();
      }
    }

    if(t.classList.contains('act-link')){
      const name = guests[idx].name || '';
      const { indexUrl, undanganUrl } = buildLinks(id, name);
      // Salin index?id by default; tampilkan info alternatif
      copy(indexUrl).then(() => {
        t.textContent = 'Link Disalin';
        setTimeout(() => { t.textContent = 'Link'; }, 1200);
      });
      // Info alternatif di title
      t.setAttribute('title', `Juga tersedia: ${undanganUrl}`);
    }
  });

  loadInitial();
}

window.initAdmin = initAdmin;