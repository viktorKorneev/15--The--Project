const model = {
    notes: [],                            // notes массив для хранения заметок.
    isShowOnlyFavorite: false,            // isShowOnlyFavorite для отображения только избранных заметок.
    countValue() {                        //❗ countValue() возвращает количество заметок. 
      if (this.isShowOnlyFavorite) {      // Если включен режим отображения только избранных, возвращает количество избранных заметок.  
        const favoriteNotes = this.notes.filter(note => {
          return note.isFavorite;
        });
        return favoriteNotes.length;
      }
      return this.notes.length;
    },
    addNote(title, content, color) {     //❗ addNote(title, content, color): добавляет новую 
      const isFavorite = false;          // заметку в начало массива notes и обновляет представление.   
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
    toggleFavorite(id) {                        //❗ toggleFavorite(id): переключает статус избранного 
      this.notes = this.notes.map((note) => {   // для заметки с указанным id и обновляет представление.
        if (note.id === id) {
          note.isFavorite = !note.isFavorite;
        }
        return note;
      });
     this.updateNotesView(); // Обновляем представление
    },
    updateNotesView() {                         //❗ updateNotesView(): обновляет представление 
      let notesToRender;                        // заметок в зависимости от isShowOnlyFavorite
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
    deleteNote(id){                             //❗deleteNote(id): удаляет заметку с указанным id и обновляет представление.
      this.notes = this.notes.filter((note) => note.id !== id)
      // view.renderNotes(this.notes)
      this.updateNotesView();
    },
  
    toggleShowOnlyFavorite(){                   //❗toggleShowOnlyFavorite(): переключает режим отображения 
      this.isShowOnlyFavorite = !this.isShowOnlyFavorite; // только избранных заметок и обновляет представление.
      this.updateNotesView();
    }
  };
  console.log(model.notes);