import axios from 'axios'
import {Client} from 'spotify-sdk';

class dcoverAPI {

    setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (1 * 3600 * 1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    supprCookie(cname) {
        const d = new Date();
        d.setTime(d.getTime() - (1 * 3600 * 1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "='';" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    login() {
        let token = window.location.hash.split('&')[0].split('=')[1]
        if(!this.getCookie('token') && token == null) {
            const client_id = '55971b5193b147a8a438659c18ae9fff'; // Your client id
            const redirect_uri = location.origin+'/callback'; // Your redirect uri

            const SECRET_ID = "ac66547861454522a463116eb83f7ef8"

            const client = Client.instance;
            client.settings = {
                clientId: client_id,
                secretId: SECRET_ID,
                scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
                redirect_uri: redirect_uri
            };
            client.login().then((url) => {
                window.location.href = url;
            });
        }
    }

    logout() {
        this.supprCookie('token');
        location.href = 'https://www.spotify.com/logout/';
    }

    async search(search) {
        const token = this.getCookie('token');
        let temp;
        await axios.get('https://api.spotify.com/v1/search?q=' + search + '&type=track', {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }).then(res => {
            temp = res.data.tracks.items.splice(0, 5)
        })
        return temp
    }

    async getSimilar(artist, track) {
        const token = this.getCookie('token');
        let temp;
        await axios.get('https://api.spotify.com/v1/recommendations?seed_artists='+artist+'&seed_tracks='+track, {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }).then(res => {
            temp = res.data.tracks.splice(0, 6)
        })
        return temp
    }
}
export default dcoverAPI;