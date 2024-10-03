const controller = {
    addNote(title, content, color) {                                         //❗addNote(title, content, color): добавляет новую заметку, 
      if (title.length > 50){                                                // если заголовок не превышает 50 символов и все поля заполнены. 
        view.showMessage("Максимальная длина заголовка - 50 символов", true) // В противном случае отображает соответствующее сообщение.
        } else if(title.trim() !== "" && content.trim() !== "") {
          model.addNote(title, content, color);
          view.showMessage("Заметка добавлена");
          model.updateNotesView();
          } else {
          view.showMessage("Заполните все поля", true)
        }
      },

      toggleFavorite(id) {                //❗toggleFavorite(id): переключает статус избранного 
        model.toggleFavorite(id);         // для заметки с указанным id, вызывая соответствующий метод модели.
      },
    
     toggleShowOnlyFavorite(){            //❗toggleShowOnlyFavorite(): переключает режим отображения 
        model.toggleShowOnlyFavorite()    // только избранных заметок, вызывая соответствующий метод модели.
      },
    
      deleteNote(id){                     //❗deleteNote(id): удаляет заметку с указанным id, 
        model.deleteNote(id)              // отображает сообщение об удалении и обновляет представление.
        view.showMessage("Заметка удалена")
        model.updateNotesView();
      }
    };
    
    function init() {       //❗init(): инициализирует представление, вызывая метод init объекта view.
      view.init();
    }
    
    init();  //❗Вызывает функцию init, чтобы инициализировать приложение при загрузке.