const { createApp } = Vue; 
//importerar createApp-funktionen från Vue.js-biblioteket. Detta gör att man kan skapa en ny Vue-applikation.

createApp({
// createApp-funktionen tar ett konfigurationsobjekt som argument, dvs ett objekt som bestämmer olika inställningar
// och funktioner som styr beteendet hos Vue-applikationen (data, metoder, lifecycle hooks osv) 
  data() {
    return {
      showModal: false, // en bool som är satt till false som standard 
      message: "",
      quotes: [],  // en tom array och kommer lagra de slumpmässiga citaten som hämtas från API:et.
    };
  },
  // --------------------------------------------------------------------------------------
  methods:  // Här definieras metoder för Vue-applikationen.
  {
    selectedQuote(index)
    {
         // index kommer vara 0 eller 1 
         if (index=="0")
         {
            this.quotes.splice(1,1); // ta bort det andra citatet 
         }
         else if (index=="1")
         {
            this.quotes.splice(0,1); // ta bort det andra citatet 
         }
    },

    refreshPage() 
    {
      location.reload();
    },
    toggleModal() 
    {
      this.showModal = !this.showModal;
    },
    fetchQuotes() 
    {
      for (let i = 0; i < 10; i++) {
        fetch('https://dummyjson.com/quotes/random')
          .then((res) => res.json())
          .then((data) => this.quotes.push(data));
      }
    }
  },
// -------------------------------------------------------------------------------------
  mounted() 
  {
// mounted är en lifecycle hook i Vue som körs när Vue-komponenten har monterats på DOM:en. 
    this.fetchQuotes();
  },
  components: 
  {
    'quote-item': // namnet på komponenten
     {
      props: ['quote'], // lista över properties som komponenten ska ha tillgång till 
      template: '<li>{{ quote }}</li>', // html-strukturen för komponenten 
     },
},
}).mount("#app");
// Slutligen monteras Vue-applikationen på DOM:en inuti elementet med id "app".
