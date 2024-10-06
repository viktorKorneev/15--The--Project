const view = {
    init() {                                //❗init(): инициализирует представление, 
      this.renderNotes(model.notes);        // вызывая методы renderNotes и renderNotesCount
      this.renderNotesCount(model.count);
  
      const form = document.querySelector(".note-form");             //❗ Обработчик формы
      const input = document.querySelector(".input-title");          // Находит элементы формы и добавляет обработчик события submit, 
      const textarea = document.querySelector(".input-description"); // который предотвращает стандартное поведение формы, 
      const radioList = document.querySelector(".radio-list");       // получает данные из полей и передает их в контроллер для добавления новой заметки.
      form.addEventListener("submit", (event) => {
        // получаем данные из полей формы
        event.preventDefault();
        // передаем данные в контроллер
        const title = input.value;
        const content = textarea.value;
        const color = document.querySelector('input[name=color]:checked').value;
        if (title.length <= 50){
          radioList.value = "";
          input.value = "";
          textarea.value = "";
        }
        controller.addNote(title, content, color);
      });
      
      const list = document.querySelectorAll(".notes-list");  // ❗Обработчик кликов по заметкам
      list.forEach((el) => {                                  // Добавляет обработчики событий для кликов по иконкам избранного 
        el.addEventListener("click", function (event) {       // и удаления, передавая соответствующие действия в контроллер.
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
    renderNotes(notes) {                                  //❗ Находит контейнер для заметок и рендерит заметки в него. 
      const list = document.querySelector(".notes-list"); 
      let notesHTML = "";
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        notesHTML += `<div class="div-list">
                    <li id="${note.id}" class="${note.isFavorite ? "favorite" : ""}">
                       <div class="div-title" style="background-color: ${note.color}">
                            <span class="title-note">${note.title}</span>  
                          <div class="div-logo"> 
                            <img class="favorite-icon" src="images/icons/heart ${note.isFavorite ? "active" : "inactive"}.png" alt="heart-logo">
                            <img class="delete-icon" src="images/icons/trash.png" alt="trash-logo">
                          </div>
                        </div>
                      <div class="div-content">
                        <span class="content-note">${note.content}</span>
                      </div>
                  </li>
                  </div> `;
      }
      list.innerHTML = notesHTML;
  
      const notNotes = document.querySelector(".not-notes");  //❗Обработка отсутствия заметок 
      if (notes.length === 0) {                               // Если заметок нет, отображает сообщение о том, что заметок нет.    
        let notNotesHTML = "";
        notNotesHTML += `<p style="padding-top: 148px">У вас нет еще ни одной заметки</br>Заполните поля выше и создайте свою первую заметку!</p>`;
        notNotes.innerHTML = notNotesHTML;
      } else {
        notNotes.innerHTML = "";
      }
  
      const filter = document.querySelector(".filter-box");   //❗Фильтр избранных заметок
        if(notes.length > 0) {                                // Добавляет фильтр для отображения только избранных заметок 
          let filterHTML = "";                                // и обработчик события для переключения этого фильтр  
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
  
    renderNotesCount() {                                       //❗Обновляет счетчик заметок, отображая общее количество заметок.
      const countTotal = document.querySelector(".total-notes");
      let countHTML = "";
      const total = model.countValue();
      countHTML += `<span class="count">${total}</span>`;
      countTotal.innerHTML = countHTML;
    },
    showMessage(message, isFavorite = false) {                // ❗Отображает сообщение пользователю. Если сообщение связано с 
      const messageNote = document.querySelector(".messages-box"); // избранным, оно отображается как ошибка, иначе как успех.
      messageHTML = "";
      messageHTML +=`<img src="images/icons/${isFavorite ? "warning" : "Done"}.png" alt=""><span class="message">${message}</span>`
      messageNote.innerHTML = messageHTML;
      if(isFavorite) {
        messageNote.classList.remove("success")
        messageNote.classList.add("error")
        } else {
        messageNote.classList.remove('error')
        messageNote.classList.add('success')
      //   setTimeout(() => {
      //     messageNote.textContent = "";
      //     messageNote.classList.remove("success", "error");
      // }, 3000);
      }
      setTimeout(() => {
        messageNote.textContent = "";
        messageNote.classList.remove("success", "error");
    }, 3000);
    },
  };
