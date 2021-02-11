// local Storage
const setItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item))
};

const getItem = key => {
  return JSON.parse(localStorage.getItem(key))
};
// months for date
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// default array
const commentArray = [
  {
    name: 'Anna',
    date: '12 oct 2015',
    text: 'Привет, Верунь! ниче себе ты крутая. фотка класс!!!! '
  },
  {
    name: 'Eva',
    date: '13 oct 2015',
    text: 'Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами?'
  },
  {
    name: 'Ivan',
    date: '14 oct 2015',
    text: 'Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?'
  },
]

let newCommentsList = [...commentArray].map(c => {
  return {
      name: c.name,
      date: c.date,
      text: c.text
  }
})

const initialComments = () => {
  const dataFromStorage = getItem('comments');
  if (dataFromStorage && dataFromStorage.length) {
      return dataFromStorage;
  }
  setItem('comments', newCommentsList);
  return [...newCommentsList];
}
initialComments()

const App = {
  data() {
    return {
      notes: getItem('comments'),
      manualBooking: 11,
      packageTours: 3,
      hotels: 1
    }
  },
  methods: {
    addNewNote() {
      if(this.inputValue !== '') {
        let inputDate = new Date()
        let dateY = inputDate.getFullYear()
        let dateM = months[inputDate.getMonth()];
        let dateD= inputDate.getDate()
        let newOdj = {
          name:'User name',
          date: `${dateD} ${dateM} ${dateY}`,
          text: this.inputValue
        }

        this.notes.push(newOdj)
        setItem('comments', this.notes);

        this.inputValue = ''
      }
    },
    inputKeyPress(event) {
      if(event.ctrlKey) {
        this.addNewNote()
      }
    }
  },
  computed: {
    totalCount() {
      return this.manualBooking + this.packageTours + this.hotels
    },
    commentArray() {
      const commentsList = getItem('comments');
      return commentsList
    }

  },
}
const app = Vue.createApp(App)

app.mount('#app')
