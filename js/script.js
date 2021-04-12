var app = new Vue (
  {
    el:"#app",
    data:{
      baseUrl:'https://api.themoviedb.org/3/search/',
      apiKey:'bb946051787722f6361023f25c0639b5',
      selectedLanguageIndex: 0,
      languages:[
        'it-IT',
        'en-US',
        'es-ES'
      ],
      userTitle:'',
      movies:[],
      myClass:"",
    },
    methods:{
      searchTitle: function(){
        // static request to the server
        // axios.get('https://api.themoviedb.org/3/search/movie?api_key=bb946051787722f6361023f25c0639b5&query=ritorno+al+fut&language=it-IT')
        // .then((response) => {
        //   this.movies = response.data.results;
        // });

        // dynamic request to the server
        axios.get( this.baseUrl + 'movie',{
          params:{
            api_key:this.apiKey,
            query:this.userTitle,
            language:this.languages[this.selectedLanguageIndex]
          }
        })
        .then((response) => {
          // console.log(response);
          this.movies = response.data.results;
        });
        if ('https://image.tmdb.org/t/p/w300null') {
          this.myClass = 'default_image';
        }
        this.userTitle = '';
      }
    }
  }
)
