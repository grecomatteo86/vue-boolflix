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
        'es-ES',
        'sv-SE',
        'hr-HR',
        'fr-FR',
        'de-DE',
        'pt-PT'
      ],
      userTitle:'',
      movies:[],
      series:[],
      myClass:"",
      myFlags:[
        'de',
        'en',
        'es',
        'fr',
        'hr',
        'it',
        'pt',
        'sv',
        'no',
        'ko',
        'ja',
        'sr',
        'zh',
        'eu',
        'fa',
        'vi',
        'tr',
        'da',
        'ms',
        'id',
        'th'
      ]
    },
    methods:{
      searchTitle: function(){
        // static request to the server
        // axios.get('https://api.themoviedb.org/3/search/movie?api_key=bb946051787722f6361023f25c0639b5&query=ritorno+al+fut&language=it-IT')
        // .then((response) => {
        //   this.movies = response.data.results;
        // });

        // dynamic request to the server
        //for movies
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
        //for tv series
        axios.get( this.baseUrl + 'tv',{
          params:{
            api_key:this.apiKey,
            query:this.userTitle,
            language:this.languages[this.selectedLanguageIndex]
          }
        })
        .then((response) => {
          this.series = response.data.results;
          //cycle every obj in series array to push them in one array (movies)
          this.series.forEach((item) => {
            // console.log(item);
            this.movies.push(item);
          });
          // console.log(this.movies);
          //cycle every vote.average in movies array to apply Math.ceil function
          this.movies.forEach((item) => {
            console.log(item.vote_average);
          });
        });
        //default_image when item.poster_path == null
        if ('https://image.tmdb.org/t/p/w300null') {
          this.myClass = 'default_image';
        }
        //cleaning
        this.userTitle = '';
      }
    }
  }
)
