const dummyImage = 'images/NoPicAvailable.png';

$(document).ready(function(){

  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  $('#rihgts-year').text(new Date().getFullYear());

  getAllPortfolios(); 


  $('#btn-contact').on('click', function(e){
    if($('#name').val().length > 3 && $('#email').val().length > 3 && $('#comments').val().length > 3) {
      const data = {
        name: $('#name').val(),
        email: $('#email').val(),
        comments: $('#comments').val()
      };
      sendMessage(data);
      
    } else {
      alert('Please fill all contact fields.');
    }
    
  });

})


function getAllPortfolios() {
    
    portfolioRef.on('child_added', snapshot => {

        let data = snapshot.val();
        
        console.log('PORTFOLIO => ', data);
        paintPorfolio(data);

    })
}

function paintPorfolio(data) {
  let content = `
  <div class="col-sm-4">
      <div class="thumbnail">
        <img src="${data.image || dummyImage}" alt="${data.title}" width="400" height="300">
        <p><strong>${data.title}</strong></p>
        <p>${data.description.substring(0, 30)}</p>
      </div>
    </div>
  `;

  $('#portfolio .row').append(content);
}


function sendMessage(data) {

  messagesRef.push(data, err => {
    if(err) {
      console.log('Error while sending message. ', err);
      
    } else {
      console.log('Message sended!');
      $('#name').val('');
      $('#email').val('');
      $('#comments').val('');
    }

  });

}