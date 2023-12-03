function nextEvent(n) {
    changeEventImg(slideIndex += n);
}

// Auto Change Image
function autoChangeEvent() {
    slideIndex++;
    changeEventImg(slideIndex);
    setTimeout(autoChangeEvent, 10000); // Change image after every 10 seconds
}

// Change image
function changeEventImg(n) {
  var i;
  var slides = document.getElementsByClassName("review-item");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // Hide every other image
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  //  Display the particular image
  slides[slideIndex-1].style.display = "flex";

//   document.getElementById('event-counter').innerHTML=slideIndex+" out of "+slides.length
}

// Main
var slideIndex = 1;

changeEventImg(slideIndex);
autoChangeEvent();