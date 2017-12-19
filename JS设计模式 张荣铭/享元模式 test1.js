/**
 * 创建于 2017/12/19
 * 作者: Qianyu
 * 功能: http://www.cnblogs.com/TomXu/archive/2012/04/09/2379774.html
 */

/*享元模式优化代码*/
const Book = function(title, author, genre, pageCount, publisherID, ISBN) {
  this.title = title
  this.author = author
  this.genre = genre
  this.pageCount = pageCount
  this.publisherID = publisherID
  this.ISBN = ISBN
}


/* Book工厂 单例 */
const BookFactory = (function() {
  const existingBooks = {}
  return {
    createBook: function(title, author, genre, pageCount, publisherID, ISBN) {
      /*查找之前是否创建*/
      const existingBook = existingBooks[ISBN]
      if (existingBook) {       // 是否已经存在了
        return existingBook
      } else {
        /* 如果没有，就创建一个，然后保存*/
        const book = new Book(title, author, genre, pageCount, publisherID, ISBN)
        existingBooks[ISBN] = book
        return book
      }
    }
  }
})


/*BookRecordManager 借书管理类 单例*/
const BookRecordManager = (function() {
  const bookRecordDatabase = {}
  return {
    /*添加借书记录*/
    addBookRecord: function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
      const book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN)
      bookRecordDatabase[id] = {
        checkoutMember: checkoutMember,
        checkoutDate: checkoutDate,
        dueReturnDate: dueReturnDate,
        availability: availability,
        book: book
      }
    },
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {    // 更新借出状态
      const record = bookRecordDatabase[bookID]
      record.availability = newStatus
      record.checkoutDate = checkoutDate
      record.checkoutMember = checkoutMember
      record.dueReturnDate = newReturnDate
    },
    extendCheckoutPeriod: function(bookID, newReturnDate) {     // 续借
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate
    },
    isPastDue: function(bookID) {                           // 是否到期
      return new Date().getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate)
    }
  }
})