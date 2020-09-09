// Vue.component('dog-card', {
//     props: ['image', 'func'],
//     template:
//     `
//     <div class="card">
//         <img :src="image" class="card-img-top" alt="Foto de un perrito">
//         <div class="card-body">
//             <button class="btn btn-primary mt-2" type="button" id="get-dog" @click="func">Actualizar foto</button>
//         </div>
//     </div>
//     `
// })

var dog = new Vue({
    el: '#dog',
    data: {
        image: '',
        responseAvailable: false,
        name: ''
    },
    created() {
        this.fetchDogsAPI();
    },
    methods: {
        fetchDogsAPI() {
            this.responseAvailable = false;

            const url = 'https://dog.ceo/api/breeds/image/random';
            const settings = {
                method: "GET"
            }

            fetch(url, settings)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        alert("Server returned " + response.status + " : " + response.statusText);
                    }
                })
                .then(responseJSON => {
                    console.log(responseJSON);
                    this.image = responseJSON.message;
                    this.responseAvailable = true;
                })
        }
    }
})

const breeds = [ "affenpinscher", 'boxer', 'bulldog', 'chihuahua', 'germanshepherd', 'greyhound', 'pomeranian']

var dogBreeds = new Vue({
    el: "#dogs-list",
    data: {
        images: [],
        breed: "",
        display: true,
        button: "Ocultar fotos"
    },
    created() {
        this.breed = breeds[Math.floor( Math.random() * breeds.length )];
        const url = `https://dog.ceo/api/breed/${this.breed}/images`;
        const settings = {
            method: "GET"
        }

        fetch(url, settings)
            .then( response => {
                if( response.ok ) {
                    return response.json();
                } 
                else {
                    alert("Server returned " + response.status + " : " + response.statusText);
                }
            })
            .then( responseJSON => {
                console.log(responseJSON)
                this.images = responseJSON.message;
                let randomNumber = Math.floor(Math.random() * 101);
                this.images = this.images.slice(randomNumber, randomNumber + 8);
            })
    },
    methods: {
        toggleDisplay: function() {
            if (this.display) {
                this.button = "Mostrar fotos"
            }
            else {
                this.button = "Ocultar fotos"
            }
            this.display = !this.display

        }
    }
})