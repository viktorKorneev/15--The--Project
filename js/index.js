// const colors = {
//   GREEN: "green",
//   BLUE: "blue",
//   RED: "red",
//   YELLOW: "yellow",
//   PURPLE: "purple",
// };

// const MOCK_NOTES = [
//   {
//     id: 1,
//     title: "Работа с формами",
//     content:
//       "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
//     color: colors.GREEN,
//     isFavorite: false,
//   },
//   {
//     id: 1,
//     title: "Работа с формами",
//     content:
//       "К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name",
//     color: colors.YELLOW,
//     isFavorite: false,
//   },
// ];

const model = {
  notes: [],
  isShowOnlyFavorite: false,
  countValue() {
    if (this.isShowOnlyFavorite) {
      const favoriteNotes = this.notes.filter(note => {
        return note.isFavorite;
      });
      return favoriteNotes.length;
    }
    return this.notes.length;
  },
  addNote(title, content, color) {
    const isFavorite = false;
    const id = Math.random();
    const note = {
      // 1. создадим новую заметку
      title,
      content,
      color,
      id,
      isFavorite,
    };
    // 2. добавим заметку в начало списка
    this.notes.unshift(note);
    // 3. обновим view
    this.updateNotesView();
    // view.renderNotes(model.notes);
  },
  toggleFavorite(id) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        note.isFavorite = !note.isFavorite;
      }
      return note;
    });
   this.updateNotesView(); // Обновляем представление
  },
  updateNotesView() {
    let notesToRender;
      // Проверяем, включен ли режим отображения только избранных заметок
      if (this.isShowOnlyFavorite) {
    // Фильтруем массив заметок, оставляя только избранные
    notesToRender = this.notes.filter(note => note.isFavorite);
    // Если нет избранных заметок, отображаем все заметки
      if (notesToRender.length === 0) {
      notesToRender = this.notes;
    }
  } else {
    // Если режим не включен, отображаем все заметки
    notesToRender = this.notes;
  }
        // Обновляем счетчик заметок
      view.renderNotesCount(this.countValue());
       // Обновляем представление заметок
      view.renderNotes(notesToRender);
   },
  deleteNote(id){
    this.notes = this.notes.filter((note) => note.id !== id)
    // view.renderNotes(this.notes)
    this.updateNotesView();
  },

  toggleShowOnlyFavorite(){
    this.isShowOnlyFavorite = !this.isShowOnlyFavorite;
    this.updateNotesView();
  }
};
console.log(model.notes);
// ========================================================================
const view = {
  init() {
    this.renderNotes(model.notes);
    this.renderNotesCount(model.count);

    const form = document.querySelector(".note-form");
    const input = document.querySelector(".input-title");
    const textarea = document.querySelector(".input-description");
    const radioList = document.querySelector(".radio-list");
    form.addEventListener("submit", (event) => {
      // получаем данные из полей формы
      event.preventDefault();
      // передаем данные в контроллер
      const title = input.value;
      const content = textarea.value;
      const color = document.querySelector('input[name="color"]:checked').value;
      if (title.length <= 50){
        radioList.value = "";
        input.value = "";
        textarea.value = "";
      }
      controller.addNote(title, content, color);
    });
    
    const list = document.querySelectorAll(".notes-list");
    list.forEach((el) => {
      el.addEventListener("click", function (event) {
        // проверяем что кликнули по кнопке class="favorite-icon"
        if (event.target.classList.contains("favorite-icon")) {
          const noteId = +event.target.parentElement.parentElement.parentElement.id
          controller.toggleFavorite(noteId);
        }
        if (event.target.classList.contains("delete-icon")) {
          const noteId = +event.target.parentElement.parentElement.parentElement.id
          controller.deleteNote(noteId)
        }
      });
      
    
    });

  },
  renderNotes(notes) {
    // your code here
    // находим контейнер для заметок и рендерим заметки в него (если заметок нет, отображаем соответствующий текст)
    // также здесь можно будет повесить обработчики кликов на кнопки удаления и избранного
    const list = document.querySelector(".notes-list");
    let notesHTML = "";
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      notesHTML += `<div class="div-list">
                  <li id="${note.id}" class="${note.isFavorite ? "favorite" : ""}">
                     <div class="div-title" style="background-color: ${note.color}">
                          <span>${note.title}</span>  
                        <div class="div-logo"> 
                          <img class="favorite-icon" src="images/icons/heart ${note.isFavorite ? "active" : "inactive"}.png" alt="heart-logo">
                          <img class="delete-icon" src="images/icons/trash.png" alt="trash-logo">
                        </div>
                      </div>
                    <div class="div-content">
                      <span>${note.content}</span>
                    </div>
                </li>
                </div> `;
    }
    list.innerHTML = notesHTML;

    const notNotes = document.querySelector(".not-notes");
    if (notes.length === 0) {
      let notNotesHTML = "";
      notNotesHTML += `<p style="padding-top: 90px">У вас нет еще ни одной заметки</br>Заполните поля выше и создайте свою первую заметку!</p>`;
      notNotes.innerHTML = notNotesHTML;
    } else {
      notNotes.innerHTML = "";
    }

    const filter = document.querySelector(".filter-box");
      if(notes.length > 0) {
        let filterHTML = "";
        filterHTML += `<label><input class="filter" type="checkbox" ${model.isShowOnlyFavorite ? "checked" : ""}>Показать только избранные заметки</label>`
        filter.innerHTML = filterHTML;
      } else {
        filter.innerHTML = "";
      }

      const filterFavorite = document.querySelector(".filter");
      if (filterFavorite) {
        filterFavorite.addEventListener("click", function () {
          controller.toggleShowOnlyFavorite()
          
          });
      
      }
  },

  renderNotesCount() {
    const countTotal = document.querySelector(".total-notes");
    let countHTML = "";
    const total = model.countValue();
    countHTML += `<span class="count">${total}</span>`;
    countTotal.innerHTML = countHTML;
  },
  showMessage(message, isFavorite = false) {
    const messageNote = document.querySelector(".messages-box");
    messageNote.textContent = message;
    if(isFavorite) {
      messageNote.classList.remove("success")
      messageNote.classList.add("error")
      } else {
      messageNote.classList.remove('error')
      messageNote.classList.add('success')
      setTimeout(() => {
        messageNote.textContent = "";
        messageNote.classList.remove("success", "error");
    }, 3000);
    }
    
  },
};
// ==============================================================
const controller = {
addNote(title, content, color) {
  if (title.length > 50){
    view.showMessage("Максимальная длина заголовка - 50 символов", true)
    } else if(title.trim() !== "" && content.trim() !== "") {
      model.addNote(title, content, color);
      view.showMessage("Заметка добавлена");
      model.updateNotesView();
      } else {
      view.showMessage("Заполните все поля", true)
    }
  },
  // здесь можно добавить валидацию полей
  // your code
  // вызываем метод модели
  // вызываем метод view, реализацию которого вам нужно будет добавить
  toggleFavorite(id) {
    model.toggleFavorite(id);
  },

 toggleShowOnlyFavorite(){
    model.toggleShowOnlyFavorite()
  },

  deleteNote(id){
    model.deleteNote(id)
    view.showMessage("Заметка удалена")
    model.updateNotesView();
  }
};

function init() {
  view.init();
}

init();

// =====================================================================


// ---------------------------------------
//   const list = document.querySelector(".notes-list");
//   list.addEventListener("click", function (event) {
//     // проверяем что кликнули по кнопке class="favorite"
//     if (event.target.classList.contains("favorite")) {
//       const noteId = +event.target.parentElement.id;
//       controller.toggleFavorite(noteId);
//     }
//   });
// ------------------------------------------
// document.querySelectorAll(".favorite-icon").forEach((element) => {
//     element.addEventListener("click", (event) => {
//       const noteId = +event.target.parentElement.id;
//       controller.toggleFavorite(noteId);
//     });
//   });
// -------------------------------------------------------

    // const listDelete = document.querySelector(".notes-list")
    // listDelete.addEventListener("click", function (event) {
    //   if(event.target.classList.contains("delete-icon")){
    //     const noteId = +event.target.parentElement.id
    //     controller.deleteNote(noteId)
    //   }
    // })
    // -----------------------------------------------------
     // // 1. рендерит список заметок (вызывает метод view.renderNotes)
    // view.renderNotes(this.notes);
    // // 2. рендерит количество заметок (вызывает метод view.renderNotesCount)
    // view.renderNotesCount(this.countValue());
    // // используем метод filter для фильтрации заметок
    // const notesToRender = this.notes.filter((note) => { 
    //   if(this.isShowOnlyFavorite !== note){
    //     view.renderNotes(this.notes);
    //   }
    // }) 
    // ----------------------------------------------------------
       // this.notes = this.notes.filter((note) => note.isFavorite !== true)
      // const notesToRender = this.isShowOnlyFavorite
      // ? this.notes.filter((note) => note.isFavorite)
      // : this.notes;
      // ----------------------------------------------------------
      //  id="${note.id}" class="${note.isFavorite ? "favorite" : ""}"
      // ---------------------------------------------------------------
      // <li id="${note.id}" class="${note.isFavorite ? "favorite" : ""}">
      //               <span>${note.title}</span>
      //               <img class="favorite-icon" src="images/icons/heart ${note.isFavorite ? "active" : "inactive"}.png" alt="heart-logo">
      //               <img class="delete-icon" src="images/icons/trash.png" alt="trash-logo">
      //             <span>${note.content}</span>
      //           </li>