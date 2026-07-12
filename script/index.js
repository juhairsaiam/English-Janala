// loading the buttons from the api
const lessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}
const removeActive = ()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => {
        btn.classList.remove("active")
    })
}
// loading words from the api 
const loadLevelWord =(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        loadWords(data.data)
    })
}
// lesson button
const displayLesson = (data)=> {
    const lessonsDiv = document.getElementById('lessonDiv')
    lessonsDiv.innerHTML = "";

    for( const lesson of data){
        const div = document.createElement("div")
        div.innerHTML = `
        
            <button id = "lesson-btn-${lesson.level_no}" onclick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-
             ${lesson.level_no}
             </button>
        `
        lessonsDiv.appendChild(div)
    }
}
// load Word Details
const loadWordDetail=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordsDetails (details.data)
}
// display word details
const displayWordsDetails = (words) =>{
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `<div>
    <p>Eager (   :ইগার)</p>
  </div>
  <div>
    <p>Meaning</p>
    <p>আগ্রহী</p>
  </div>
  <div>
    <p>Example</p>
    <p>The kids were eager to open their gifts.</p>
  </div>
  <div>
    <p class="bg-[#D7E4EF] ">সমার্থক শব্দ গুলো</p>
    <p class="bg-[#D7E4EF]"></p>
    <p class="bg-[#D7E4EF]"></p>
    <p class="bg-[#D7E4EF]"></p>
  </div>
  <button>Complete Learning</button>`
    document.getElementById("my_modal").showModal(); 
}
// // load lesson words
const loadWords = (data)=>{
const wordsDiv = document.getElementById('wordsDiv')
wordsDiv.innerHTML ='';
if(data.length === 0){
        wordsDiv.innerHTML = `
        <div class="text-center col-span-full space-y-5">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
  <p class="text-[#79716B] text-sm">আপনি এখনো কোন Lesson Select করেন নি</p>
  <p class="font-bold text-2xl">একটি Lesson Select করুন।</p>
</div>
        `
    return;
}
 data.forEach(element => {
     const div = document.createElement("div")
    div.innerHTML = `
    <div class ="bg-white shadow-md p-14 text-center space-y-3">  
    <p class ="font-bold text-2xl">${element.word ? element.word : 'no word found'}</p>
      <p>Meaning /Pronounciation</p>
      <p class ="font-semibold text-2xl">${element.meaning? element.meaning : 'no meaning found'} / ${element.pronunciation ? element.pronunciation : 'pronunciation not found'}</p>
      <div class="flex justify-between">
       <div onclick="loadWordDetail(${element.id})" class="bg-[#c4cce7] p-2 rounded-md"> <i class="fa-solid fa-circle-info"></i></div>
       <div class="bg-[#cad1ea] p-2 rounded-md"><i class="fa-solid fa-volume-high"></i></div>  
       </div>
    `
    wordsDiv.appendChild(div);
 });
}
lessons()
