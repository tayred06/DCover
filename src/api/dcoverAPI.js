import axios from 'axios'

class dcoverAPI {

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
        console.log('tata')
        this.setCookie('token', window.location.hash.split('&')[0].split('=')[1], 365)
        // window.location.href = location.host;
    }

    async search(search) {
        const token = this.getCookie('token')
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