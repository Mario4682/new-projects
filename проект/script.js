var btn=document.getElementById('button');
window.addEventListener('scroll',function() {
    if (window.scrollY>300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

//Добави събитие при клик на бутона
btn.addEventListener('click',function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0,behavior: 'smooth' });
});
var searchButton=document.getElementById('searchButton');
//Функция за търсене на текста на страницата
function findTextOnPage(text)  {
    if (window.find && text)  {
        window.find(text);
} else {
    alert('Търсенето не е възможно в този браузър или текстът е празен.');
 }
}