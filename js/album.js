// Ambil data dari file JSON album
fetch('json/album.json')
  .then(response => response.json())
  .then(albums => {
    const albumListContainer = document.getElementById('albumList');
    const searchInput = document.querySelector('.memories-search');

    // Tampilkan daftar album secara acak
    displayRandomAlbums(albums);

    // Fungsi untuk menampilkan daftar album secara acak
    function displayRandomAlbums(albums) {
      // Acak urutan album
      shuffleArray(albums);

      // Tampilkan album yang sudah diacak
      displayAlbums(albums);
    }

    // Fungsi untuk menampilkan daftar album
    function displayAlbums(albums) {
      albumListContainer.innerHTML = ''; // Kosongkan container sebelum menampilkan album
      albums.forEach(album => {
        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        albumItem.dataset.albumId = album.id;
        albumItem.innerHTML = `
          <div class="album-item-container">
          <img src="${album.cover}" alt="${album.title}" class="album-cover" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
          <h3 class="album-title">${album.title}</h3>
          <p class="album-artist">${album.artist}</p>
          <div class="album-crit">
          <p>${album.tanggal}</p>
          </div>
          </div>
        `;
        albumListContainer.appendChild(albumItem);

        // Tambahkan event listener untuk menampilkan detail album saat diklik
        albumItem.addEventListener('click', () => {
          displayAlbumDetails(album);
        });
      });
    }

    // Fungsi untuk menampilkan detail album
    class AlbumDetails {
      constructor(album) {
        this.album = album;
        this.render();
      }

      render() {
        const albumDetailsContainer = document.getElementById('albumDetails');
        albumDetailsContainer.innerHTML = `
        <div class="album-details-container">
        <button id="closeButton">Close</button>
        <div class="album-details">
          <h2 class="album-details-title">${this.album.title}</h2>
          <img src="${this.album.cover}" alt="${this.album.title}" class="album-details-cover" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
          <p class="album-details-artist">Artist: ${this.album.artist}</p>
          <p class="album-details-genre">Genre: ${this.album.genre}</p>
          <p class="album-details-tanggal">Release Year: ${this.album.tanggal}</p>
        </div>
      </div>
      
      
        `;

        // Tambahkan event listener untuk tombol close
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
          albumDetailsContainer.innerHTML = ''; // Kosongkan detail album
        });
      }
    }

    // Fungsi untuk menampilkan detail album saat diklik
    function displayAlbumDetails(album) {
      new AlbumDetails(album);
    }

    // Fungsi untuk mengacak array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Kode untuk tombol kategori
    const categoryButtonsContainer = document.getElementById('categoryButtons');

    // Daftar kategori
    const categories = ['All', 'Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic'];

    // Tampilkan tombol untuk setiap kategori
    categories.forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category;
      categoryButton.classList.add('category-button');
      categoryButtonsContainer.appendChild(categoryButton);

      // Tambahkan event listener untuk setiap kategori
      categoryButton.addEventListener('click', () => {
        filterAlbumsByCategory(category);
      });
    });

    // Fungsi untuk memfilter album berdasarkan kategori
    function filterAlbumsByCategory(category) {
      let filteredAlbums;
      if (category === 'All') {
        // Jika kategori "All" dipilih, tampilkan semua album
        displayAlbums(albums);
        return; // Keluar dari fungsi setelah menampilkan semua album
      }
      // Jika kategori lain dipilih, filter album berdasarkan kategori
      filteredAlbums = albums.filter(album => album.genre === category);
      displayFilteredAlbums(filteredAlbums);
    }

    // Fungsi untuk menampilkan album yang sudah difilter
    function displayFilteredAlbums(filteredAlbums) {
      displayAlbums(filteredAlbums);
    }

    // Fungsi untuk mencari album berdasarkan judul
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredAlbums = albums.filter(album => album.title.toLowerCase().includes(searchTerm));
      displayFilteredAlbums(filteredAlbums);
    });
  });
