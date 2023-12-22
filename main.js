document.addEventListener('DOMContentLoaded', function () {
    // Get the elements
    var menu = document.querySelector('.menu');
    var toggleBtn = document.querySelector('.toggle-btn');
    
    

    // Add click event listener to the toggle button
    toggleBtn.addEventListener('click', function () {
        // Toggle the "open" class on the menu
        menu.classList.toggle('open');
        toggleBtn.classList.toggle('open');
    });
});


const links = document.querySelector('.links a');

links.forEach((link) =>{
    link.addEventListener(click, () =>{
        links.forEach((link) => link.classList.remove('active'))
        link.classList.add('active')
        menuClose()
    })
})

function menuClose()
{
    menu.classList.remove('open')
    toggleBtn.classList.remove('open')
}

