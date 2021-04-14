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
      moviesAndSeries:[],
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
      ],
      selected:''
    },
    methods:{
      searchTitle: function(){
        if (this.userTitle != '') {

          if (this.selected == 'All') {
            // STATIC request to the server
            // axios.get('https://api.themoviedb.org/3/search/movie?api_key=bb946051787722f6361023f25c0639b5&query=ritorno+al+fut&language=it-IT')
            // .then((response) => {
            //   this.movies = response.data.results;
            // });

            // DYNAMIC requests to the server
            //cleaning the array moviesAndSeries at every event (without page reload) because of push
            this.moviesAndSeries = [];
            //axios for MOVIES
            axios.get( this.baseUrl + 'movie',{
              params:{
                api_key:this.apiKey,
                query:this.userTitle,
                language:this.languages[this.selectedLanguageIndex]
              }
            })
            .then((response) => {
              // console.log(response);
              //push with spread operator
              this.moviesAndSeries.push(...response.data.results);
            });
            //axios for TV SERIES
            axios.get( this.baseUrl + 'tv',{
              params:{
                api_key:this.apiKey,
                query:this.userTitle,
                language:this.languages[this.selectedLanguageIndex]
              }
            })
            .then((response) => {
              this.moviesAndSeries.push(...response.data.results);
              //cycle every vote.average in movies array to apply Math.ceil function
              this.moviesAndSeries.forEach((item) => {
                // console.log(item.vote_average);
                item.vote_average = Math.ceil(item.vote_average / 2);
              });
              //sorting movies and series by vote average (from high to low)
              this.moviesAndSeries.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1);
            });
            //cleaning
            this.userTitle = '';
          } else if (this.selected == 'Movies') {
            this.moviesAndSeries = [];
            axios.get( this.baseUrl + 'movie',{
              params:{
                api_key:this.apiKey,
                query:this.userTitle,
                language:this.languages[this.selectedLanguageIndex]
              }
            })
            .then((response) => {
              this.moviesAndSeries.push(...response.data.results);
              this.moviesAndSeries.forEach((item) => {
                item.vote_average = Math.ceil(item.vote_average / 2);
              });
              this.moviesAndSeries.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1);
            });
            this.userTitle = '';
          } else if (this.selected == 'Series') {
            this.moviesAndSeries = [];
            axios.get( this.baseUrl + 'tv',{
              params:{
                api_key:this.apiKey,
                query:this.userTitle,
                language:this.languages[this.selectedLanguageIndex]
              }
            })
            .then((response) => {
              this.moviesAndSeries.push(...response.data.results);
              this.moviesAndSeries.forEach((item) => {
                item.vote_average = Math.ceil(item.vote_average / 2);
              });
              this.moviesAndSeries.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1);
            });
            this.userTitle = '';
          }
        }
      }
    }
  }
)
