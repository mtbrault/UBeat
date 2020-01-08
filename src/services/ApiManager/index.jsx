import axios from 'axios';
import Cookies from 'js-cookie';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://ubeat.herokuapp.com',
});

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: headers.Authorization || Cookies.get('token'),
  },
}));

export default class APIManager {
  static getUserById(userId) {
    return API.get(`/users/${userId}`);
  }

  static followUserById(userId) {
    return API.post('/follow', { id: userId });
  }

  static unFollowUserById(userId) {
    return API.delete(`/follow/${userId}`);
  }

  static registerUser(name, email, password) {
    return API.post('/signup', {
      name, email, password,
    });
  }

  static async loginUser(email, password) {
    const res = await API.post('/login', {
      email, password,
    });
    return res;
  }

  static logoutUser() {
    return API.post('/logout');
  }

  static search(q, limit) {
    return API.get(`/search?q=${q}&limit=${limit}`);
  }

  static searchUser(q) {
    return API.get(`/search/users?q=${q}&limit=10`);
  }

  static getTokenInfo(token) {
    return API.get('/tokeninfo', { headers: { Authorization: token } });
  }

  static createPlaylist(name, owner) {
    return API.post('/playlists', {
      name,
      owner,
    });
  }

  static putPlaylist(playlistId, name) {
    return API.put(`/playlists/${playlistId}`, {
      name,
    });
  }

  static deletePlaylist(playlistId) {
    return API.delete(`/playlists/${playlistId}`);
  }

  static getPlaylistById(playlistId) {
    return API.get(`/playlists/${playlistId}`);
  }

  static deleteTrackOfPlaylist(playlistId, trackId) {
    return API.delete(`/playlists/${playlistId}/tracks/${trackId}`);
  }

  static postTrackToPlaylist(idPlaylist, track) {
    return API.post(`/playlists/${idPlaylist}/tracks`, track);
  }

  static getUserPlayList(userId) {
    return API.get(`/users/${userId}/playlists`);
  }

  static async getArtistWithAlbums(artistId) {
    const { data: { results } } = await API.get(`/artists/${artistId}`);
    if (!results[0]) {
      throw new Error("Artist doesn't exist");
    } else {
      const { data } = await API.get(`/artists/${artistId}/albums`);
      results[0].albums = data;
    }
    return {
      data: results[0],
    };
  }

  static async getAlbumWithTracks(albumId) {
    const { data: { results } } = await API.get(`/albums/${albumId}`);
    if (!results[0]) {
      throw new Error("Album doesn't exist");
    }
    const { data: tracks } = await API.get(`/albums/${albumId}/tracks`);
    results[0].tracks = tracks;
    return { data: results[0] };
  }

  static getDiscoverAlbums() {
    const data = {
      resultCount: 10,
      results: [
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 201714418,
          collectionId: 562648250,
          amgArtistId: 843628,
          artistName: 'Wiz Khalifa',
          collectionName: 'O.N.I.F.C. (Deluxe Version)',
          collectionCensoredName: 'O.N.I.F.C. (Deluxe Version)',
          artistViewUrl: 'https://music.apple.com/us/artist/wiz-khalifa/201714418?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/o-n-i-f-c-deluxe-version/562648250?uo=4',
          artworkUrl60: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ec/7b/c6/ec7bc678-2494-48fa-6b14-82cfc07c5b27/source/60x60bb.jpg',
          artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ec/7b/c6/ec7bc678-2494-48fa-6b14-82cfc07c5b27/source/100x100bb.jpg',
          collectionPrice: 14.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 22,
          copyright: '℗ 2012 Atlantic Recording Corporation for the United States and WEA International Inc. for the world outside of the United States',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2012-12-04T08:00:00Z',
          primaryGenreName: 'Hip-Hop/Rap',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 95705522,
          collectionId: 422045097,
          amgArtistId: 724933,
          artistName: 'Chris Brown',
          collectionName: 'F.A.M.E. (Expanded Edition)',
          collectionCensoredName: 'F.A.M.E. (Expanded Edition)',
          artistViewUrl: 'https://music.apple.com/us/artist/chris-brown/95705522?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/f-a-m-e-expanded-edition/422045097?uo=4',
          artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/85/e6/51/85e651c2-6690-6ef4-daf5-5f29c8705597/source/60x60bb.jpg',
          artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/85/e6/51/85e651c2-6690-6ef4-daf5-5f29c8705597/source/100x100bb.jpg',
          collectionPrice: 13.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 18,
          copyright: '℗ 2011 RCA Records, a division of Sony Music Entertainment',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2011-03-22T07:00:00Z',
          primaryGenreName: 'R&B/Soul',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 4488522,
          collectionId: 407367039,
          amgArtistId: 365124,
          artistName: 'P!nk',
          collectionName: 'F**kin Perfect(Perfect) - Single',
          collectionCensoredName: 'F**kin Perfect(Perfect) - Single',
          artistViewUrl: 'https://music.apple.com/us/artist/p-nk/4488522?uo=4',
          cllectionViewUrl: 'https://music.apple.com/us/album/f-kin-perfect-perfect-single/407367039?uo=4',
          atworkUrl60: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/dd/4c/b1/dd4cb18b-0f8b-cd31-0d6d-89e8ca4cc135/source/60x60bb.jpg',
          atworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/dd/4c/b1/dd4cb18b-0f8b-cd31-0d6d-89e8ca4cc135/source/100x100bb.jpg',
          cllectionPrice: 1.29,
          cllectionExplicitness: 'cleaned',
          cntentAdvisoryRating: 'Clean',
          tackCount: 1,
          cpyright: '℗ 2010 LaFace Records, a unit of Sony Music Entertainment',
          cuntry: 'USA',
          crrency: 'USD',
          rleaseDate: '2010 - 12 - 14T08: 00: 00Z',
          pimaryGenreName: 'Pop',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 3445763,
          collectionId: 1242676291,
          amgArtistId: 425513,
          artistName: 'Papa Roach',
          collectionName: 'F.E.A.R.',
          collectionCensoredName: 'F.E.A.R.',
          artistViewUrl: 'https://music.apple.com/us/artist/papa-roach/3445763?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/f-e-a-r/1242676291?uo=4',
          artworkUrl60: 'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/a2/db/fd/a2dbfd25-300b-c8a2-b63b-0aaa1c2c1f43/source/60x60bb.jpg',
          artworkUrl100: 'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/a2/db/fd/a2dbfd25-300b-c8a2-b63b-0aaa1c2c1f43/source/100x100bb.jpg',
          collectionPrice: 7.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 12,
          copyright: '℗ 2015 Eleven Seven Music',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2015-01-27T08:00:00Z',
          primaryGenreName: 'Hard Rock',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 342826213,
          collectionId: 530988823,
          amgArtistId: 2061153,
          artistName: 'Waka Flocka Flame',
          collectionName: 'Triple F Life: Friends, Fans & Family (Deluxe Version)',
          collectionCensoredName: 'Triple F Life: Friends, Fans & Family (Deluxe Version)',
          artistViewUrl: 'https://music.apple.com/us/artist/waka-flocka-flame/342826213?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/triple-f-life-friends-fans-family-deluxe-version/530988823?uo=4',
          artworkUrl60: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/59/14/e8/5914e8b6-935b-b87c-ca97-e9b371f6167c/source/60x60bb.jpg',
          artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/59/14/e8/5914e8b6-935b-b87c-ca97-e9b371f6167c/source/100x100bb.jpg',
          collectionPrice: 13.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 19,
          copyright: '℗ 2012 Warner Records Inc.',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2012-06-08T07:00:00Z',
          primaryGenreName: 'Hip-Hop/Rap',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 5499815,
          collectionId: 714786102,
          amgArtistId: 555597,
          artistName: 'Lloyd Banks',
          collectionName: 'H.F.M. 2 (Hunger for More 2)',
          collectionCensoredName: 'H.F.M. 2 (Hunger for More 2)',
          artistViewUrl: 'https://music.apple.com/us/artist/lloyd-banks/5499815?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/h-f-m-2-hunger-for-more-2/714786102?uo=4',
          artworkUrl60: 'https://is4-ssl.mzstatic.com/image/thumb/Music4/v4/fa/9b/7f/fa9b7f05-ebdd-bf21-bb4b-e8ef259f4eba/source/60x60bb.jpg',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music4/v4/fa/9b/7f/fa9b7f05-ebdd-bf21-bb4b-e8ef259f4eba/source/100x100bb.jpg',
          collectionPrice: 9.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 13,
          copyright: '℗ 2010 G-Unit Records, LLC',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2010-11-22T08:00:00Z',
          primaryGenreName: 'Hip-Hop/Rap',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 448916501,
          collectionId: 1377817353,
          amgArtistId: 2669415,
          artistName: 'Maluma',
          collectionName: 'F.A.M.E.',
          collectionCensoredName: 'F.A.M.E.',
          artistViewUrl: 'https://music.apple.com/us/artist/maluma/448916501?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/f-a-m-e/1377817353?uo=4',
          artworkUrl60: 'https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/59/b0/bd/59b0bd02-283f-1f90-bcda-005df63986b7/source/60x60bb.jpg',
          artworkUrl100: 'https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/59/b0/bd/59b0bd02-283f-1f90-bcda-005df63986b7/source/100x100bb.jpg',
          collectionPrice: 9.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 15,
          copyright: '℗ 2017, 2018 Sony Music Entertainment US Latin LLC',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2018-05-18T07:00:00Z',
          primaryGenreName: 'Urbano latino',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 201714418,
          collectionId: 562647782,
          amgArtistId: 843628,
          artistName: 'Wiz Khalifa',
          collectionName: 'O.N.I.F.C.',
          collectionCensoredName: 'O.N.I.F.C.',
          artistViewUrl: 'https://music.apple.com/us/artist/wiz-khalifa/201714418?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/o-n-i-f-c/562647782?uo=4',
          artworkUrl60: 'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/80/47/47/804747d8-f41f-423a-ac5d-ed8fb296de70/source/60x60bb.jpg',
          artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/80/47/47/804747d8-f41f-423a-ac5d-ed8fb296de70/source/100x100bb.jpg',
          collectionPrice: 11.99,
          collectionExplicitness: 'explicit',
          contentAdvisoryRating: 'Explicit',
          trackCount: 17,
          copyright: '℗ 2012 Atlantic Recording Corporation for the United States and WEA International Inc. for the world outside of the United States',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2012-12-04T08:00:00Z',
          primaryGenreName: 'Hip-Hop/Rap',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 201714418,
          collectionId: 562648487,
          amgArtistId: 843628,
          artistName: 'Wiz Khalifa',
          collectionName: 'O.N.I.F.C. (Deluxe Version)',
          collectionCensoredName: 'O.N.I.F.C. (Deluxe Version)',
          artistViewUrl: 'https://music.apple.com/us/artist/wiz-khalifa/201714418?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/o-n-i-f-c-deluxe-version/562648487?uo=4',
          artworkUrl60: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/89/8b/cd/898bcd3c-8f04-1c37-5a5f-002cc7b4bf2a/source/60x60bb.jpg',
          artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/89/8b/cd/898bcd3c-8f04-1c37-5a5f-002cc7b4bf2a/source/100x100bb.jpg',
          collectionPrice: 14.99,
          collectionExplicitness: 'cleaned',
          contentAdvisoryRating: 'Clean',
          trackCount: 22,
          copyright: '℗ 2012 Atlantic Recording Corporation for the United States and WEA International Inc. for the world outside of the United States',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2012-12-04T08:00:00Z',
          primaryGenreName: 'Hip-Hop/Rap',
        },
        {
          wrapperType: 'collection',
          collectionType: 'Album',
          artistId: 62820413,
          collectionId: 149177112,
          amgArtistId: 744567,
          artistName: 'Arctic Monkeys',
          collectionName: 'Who the F*** Are Arctic Monkeys? - EP',
          collectionCensoredName: 'Who the F*** Are Arctic Monkeys? - EP',
          artistViewUrl: 'https://music.apple.com/us/artist/arctic-monkeys/62820413?uo=4',
          collectionViewUrl: 'https://music.apple.com/us/album/who-the-f-are-arctic-monkeys-ep/149177112?uo=4',
          artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Music49/v4/c2/9f/17/c29f17c3-e9db-8bad-de23-b9f9c15542e5/source/60x60bb.jpg',
          artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music49/v4/c2/9f/17/c29f17c3-e9db-8bad-de23-b9f9c15542e5/source/100x100bb.jpg',
          collectionPrice: 5.99,
          collectionExplicitness: 'notExplicit',
          trackCount: 5,
          copyright: '℗ 2006 Domino Recording Co Ltd',
          country: 'USA',
          currency: 'USD',
          releaseDate: '2006-05-09T07:00:00Z',
          primaryGenreName: 'Alternative',
        },
      ],
    };
    return {
      data,
    };
  }

  static getDiscoverArtists() {
    const data = {
      resultCount: 10,
      results: [
        {
          wrapperType: 'artist',
          artistType: 'Author',
          artistName: 'A. A. Milne',
          artistLinkUrl: 'https://music.apple.com/us/author/a-a-milne/id2037174?uo=4',
          artistId: 2037174,
          primaryGenreName: 'Classics',
          primaryGenreId: 10042,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'A+',
          artistLinkUrl: 'https://music.apple.com/us/artist/a/358223?uo=4',
          artistId: 358223,
          amgArtistId: 50083,
          primaryGenreName: 'Hip-Hop/Rap',
          primaryGenreId: 18,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'A',
          artistLinkUrl: 'https://music.apple.com/us/artist/a/635168856?uo=4',
          artistId: 635168856,
          amgArtistId: 291333,
          primaryGenreName: 'Rock',
          primaryGenreId: 21,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'A',
          artistLinkUrl: 'https://music.apple.com/us/artist/a/550006703?uo=4',
          artistId: 550006703,
          primaryGenreName: 'Rock',
          primaryGenreId: 21,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'A. R. Rahman',
          artistLinkUrl: 'https://music.apple.com/us/artist/a-r-rahman/3249567?uo=4',
          artistId: 3249567,
          amgArtistId: 278580,
          primaryGenreName: 'Bollywood',
          primaryGenreId: 1263,
        },
        {
          wrapperType: 'artist',
          artistType: 'Author',
          artistName: 'Albert Camus',
          artistLinkUrl: 'https://music.apple.com/us/author/albert-camus/id57528162?uo=4',
          artistId: 57528162,
          amgArtistId: 599561,
          primaryGenreName: 'Classics',
          primaryGenreId: 10042,
        },
        {
          wrapperType: 'artist',
          artistType: 'Author',
          artistName: 'Anne Morrow Lindbergh',
          artistLinkUrl: 'https://music.apple.com/us/author/anne-morrow-lindbergh/id46656387?uo=4',
          artistId: 46656387,
          primaryGenreName: 'Fiction & Literature',
          primaryGenreId: 9031,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'BoA',
          artistLinkUrl: 'https://music.apple.com/us/artist/boa/74066466?uo=4',
          artistId: 74066466,
          amgArtistId: 534133,
          primaryGenreName: 'J-Pop',
          primaryGenreId: 27,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'B.A.P',
          artistLinkUrl: 'https://music.apple.com/us/artist/b-a-p/710183485?uo=4',
          artistId: 710183485,
          amgArtistId: 2641777,
          primaryGenreName: 'K-Pop',
          primaryGenreId: 51,
        },
        {
          wrapperType: 'artist',
          artistType: 'Artist',
          artistName: 'A.C. Newman',
          artistLinkUrl: 'https://music.apple.com/us/artist/a-c-newman/13759021?uo=4',
          artistId: 13759021,
          amgArtistId: 657815,
          primaryGenreName: 'Alternative',
          primaryGenreId: 20,
        },
      ],
    };

    return {
      data,
    };
  }
}
