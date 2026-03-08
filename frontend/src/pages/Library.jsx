import React from 'react';
import TopHeader from '../components/TopHeader';

const Library = () => {
  return (
    <main className="main-content">
      {/* Background Decoration */}
      <div className="library-bg-decor"></div>
      
      <TopHeader />

      {/* Scrollable Content */}
      <div className="library-content">
        {/* Filter Chips */}
        <div className="filter-chips-container">
          <div className="filter-chips">
            <button className="chip-active">Playlists</button>
            <button className="chip-inactive">Artists</button>
            <button className="chip-inactive">Albums</button>
            <button className="chip-inactive">Podcasts</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Sort by:</span>
            <select className="bg-transparent border-none py-0 pl-0 pr-8 text-white font-semibold focus:ring-0 cursor-pointer" style={{appearance: 'auto'}}>
              <option>Recents</option>
              <option>Alphabetical</option>
              <option>Date Added</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="library-grid">
          {/* Liked Songs Large Card */}
          <div className="liked-songs-card">
            <div className="liked-songs-icon">
              <span className="material-symbols-outlined text-9xl text-white">favorite</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-white text-4xl font-bold mb-2">Liked Songs</h2>
              <p className="text-white/80 font-medium">1,248 songs</p>
            </div>
            <button className="library-play-btn absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="material-symbols-outlined text-3xl fill-current">play_arrow</span>
            </button>
          </div>

          {/* Playlist Cards */}
          {[
            { title: 'Midnight Vibes', author: 'By Alex Rivers', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-vGEzvyR_7zK75sgHfd8nBLQBBCR0lV49x7saqxhFnhyB0KvwRtqxUIqtKR-XTwGoAYwRFrYW1KvJTo7I6AGrC4gJS45KBmT07yJdEk2L4Uyc4JAPp7_VFhpM8pgTQQb33Mg4WeMkZpnilJhV8bzIpY24d107oR3KZNPJ4iD3y196G1T73HJhelMAXtDQaqFcsjsL0cz6l425EkLtZwiuRaELjIUoY9yxkcjjU46f3-UnohXWTDObVRAd9EzRjBMa0fJQRXsTMqA' },
            { title: 'Ethereal Dreams', author: 'Playlist • 45 tracks', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLkGkULP6WPN6NY8NVOdm-L-gY94XjLuqzBevfPUmAbtNxmjvioHWAhsUSeBieYRcW_YtQxmbBcKNDnwFR4oip2LfdCC7axxc284rbSYkSwCl_AFMGdJzBb8DJOcR0CpmFlTi6RIBfrBWIfLQLGGBEDSDmqG-_Q52DvXvAD0Y8Ioww5BlbqsUk3B3E75RnAsiJEElgSdO44aLyX10Q-GC9lMRetUjbdBJTAOEmzPdVIIwM66q99wNGbhYdt-6YOmm66n5AFr6vjOM' },
            { title: 'Morning Acoustic', author: 'Playlist • 128 tracks', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYGPBtGcnVLxUAsy2VI2yU2KS1jqCbzOsjiZNz9MwaqmAQiNwx6X-rlOfd9CjQl3cl60WqolJkkknQqIyi7d3TYxrlc_fz-v0znGyeciJjqlgsTzho4V4TlIXUgBUy7jMj0lEWrrMEc792sdt8ma4QfPxIbW6Flxg6_Sf9WdQVCYMZ3P9jJUb6JGS0uwTHKO_Hvo87FotC5baonJwTqg_AOCiYeNVndtP3SiD-7kR_zVMle79nOYTKrFVmYZXbXTbcsiK9jrWRNoA' },
            { title: 'Techno Focus', author: 'By Melody Team', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvdXQAEnvKHg46QRN79Sz2tghd8BKrf6XNTAX95OqRXI87qsUbkwlHYn5JtJ_xk_uRH--EbqXMvHFcZC2AG9xau6_3qFQp9rw-lv6_B30pD9vAjF8SumDGFFIdExtCKEksB57Wl7kd7z4OQcSNkv9_UZvav2t7U-vNo0w0YuLinnzUIcgvflB9RpE9e0e-Ormg9YMQCd8E88Noaj96bjBsOxgtkoMIFWjktCCQEtHZHGCpqzOteDxoCsRLfv1MK29m43VYWk17Xzs' },
            { title: 'Jazz Classics', author: 'Album • Various Artists', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy2HpH5LAUA3KQ-d2k3QGMF7bxnsr4k3vX1vD8yC7JL5hppnfejlX6137l72Mhfc-Ssy4bs7Mez29PIyLbdJBjmfYKkIV_GnZDqsbFweEOqZw0NSlZrqHa3weX_AGvfrDIsH5Vd6JAa2YRqynY02hudbPFJqcdFrjSqMBQMnLg8CVYELXRXpcacQPLndl9bdKgWkaAa96z150RNlPY1dSqCy21SUqmXzjd175P-2JJxFZBUEqrEeMp9Afiq-_DJLbATST3Vxu2sRY' },
            { title: 'Summer Anthems', author: 'Playlist • 80 tracks', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6Cuk9LhJhYbfAYFIL4OBfBNuBrQxJ7vyszDPZFOKDgSWnMhnHwXc0CZXxZHkouMy4lqIyJpFwYq222BuCssV5OxsAzj5ZeLfOah03s2ZZr4QkbRKRsR2TP6gHil9SZjsn9jXh9Wstf11CO0bFkfwU4TKYFEaKxeJErKyiSE91iYs0AxgwH6umwxbFn0q59G7Vfo2XYq8WM8PAqWSkcaI4-_BldqKVD1G2ftVKvo6vc_p8YYhHVTZ-8tfnLyR-2hin-mM1TEUNClo' },
            { title: 'Deep Sleep', author: 'Playlist • 32 tracks', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0kP2W5QaJd8cm37VaaHvVnmeSq_YdhT5FXzaTTa5N67r0uySpqTRLZTMaGRc4uYP7SJQJcEmzz2btROH9AihtGTdyaDseIn0WoDQfuqSg1P3O5_if9f-f2lmhQ4BRkevmebtOVAEbR-8-xIvCbj7V49H4erHQH8OnAG1yp6lNS-x9TaTfyXUdb3R8JmPkxT2Ae5-7zEUcQZ3lDceYhxsG8ymuz38NEoyH3ufHLxOMns5qh0unYfim2zNu3z46d9KZoFlLyZJEuzM' }
          ].map((playlist, idx) => (
            <div key={idx} className="library-card">
              <div className="library-card-img-wrapper">
                <div 
                  className="library-card-img" 
                  style={{ backgroundImage: `url('${playlist.img}')` }}
                ></div>
                <div className="library-card-overlay">
                  <button className="library-play-btn">
                    <span className="material-symbols-outlined fill-current">play_arrow</span>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-white truncate">{playlist.title}</h3>
              <p className="text-sm text-slate-400">{playlist.author}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Library;
