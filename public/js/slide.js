const pages = document.querySelectorAll('.page');
let activeIndex = 0;
let nextIndex;

let slideLeft = () => {
        nextIndex = activeIndex + 1 <= pages.length - 1? activeIndex + 1: 0;

    const currentPage = document.querySelector(`[data-index ='${activeIndex}']`);
    const nextPage = document.querySelector(`[data-index ="${nextIndex}"]`);

    currentPage.dataset.status = "after";

    nextPage.dataset.status = "between-states";

    setTimeout(() => {
        nextPage.dataset.status = "active";
        activeIndex = nextIndex;
    }, 0);
};
let slideRight = () => {
nextIndex = activeIndex - 1 < 0 ? pages.length - 1: activeIndex - 1;

const currentPage = document.querySelector(`[data-index ='${activeIndex}']`);
const nextPage = document.querySelector(`[data-index ="${nextIndex}"]`);

currentPage.dataset.status = "before";

nextPage.dataset.status = "between-states-right";

setTimeout(() => {
    nextPage.dataset.status = "active";
    activeIndex = nextIndex;
}, 0);
}
