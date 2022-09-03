const catagoryUrl = 'https://openapi.programming-hero.com/api/news/categories';
const newsUrl = 'https://openapi.programming-hero.com/api/news/category/';
const catagoryContainer = document.getElementById('catagoryContainer');
const newsContainer = document.getElementById('newsContainer');
const itemFound = document.getElementById('itemFound');

fetch(catagoryUrl)
.then(e=>e.json())
.then(e=>{
    e.data.news_category.forEach(v=>{
        catagoryContainer.innerHTML += `<a class="nav-item nav-link" href="#" onclick="getData('${v.category_id}','${v.category_name}')">${v.category_name}</a>`;
    });
})
.catch(e=>console.log(e));

function getData(catagoryId,catagoryName){
    newsContainer.innerHTML="";
    fetch(newsUrl+catagoryId)
    .then(e=>e.json())
    .then(e=>{
        // console.log(catagoryName);
        itemFound.innerText = e.data.length!==0?`${e.data.length} items found for category ${catagoryName}`:`No items found for catagory ${catagoryName}`;
        e.data.forEach(v=>{
            // console.log(v)
            newsContainer.innerHTML += `
            <div class="card mb-4 border-0" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.204), 0 6px 50px 0 rgba(0, 0, 0, 0.073);">
            <div class="card-body row g-1">
              <img src="${v.thumbnail_url}" alt="" class="col-12 col-md-4 col-lg-2" style="height: 250px;border-radius: 12px;">
              <div class="col-12 col-md-8 col-lg-10 px-lg-4 pt-3 px-md-4">
                <h4>${v.title}</h4>
                <p class="news-description" id="newsDesc">${v.details}</p>
                  <div class="row">
                    <div class="col d-flex align-items-center">
                      <img src="${v.author.img}" alt="" style="height:40px;width:40px;border-radius:100%">
                      <div class="d-flex flex-column justify-content-center ms-2">
                        <span style="font-size:14px;font-weight: 500;white-space: nowrap;">${v.author.name}</span>
                        <span style="font-size:12px; white-space;nowrap;">${v.author.published_date}</span>
                      </div>
                    </div>
                    <div class="col d-flex align-items-center  justify-content-lg-start justify-content-end">
                      <i class="fa-regular fa-eye"></i>&nbsp
                      <span>${v.total_view}</span>
                    </div>
                    <div class="col-12 col-lg-3 mt-3 mt-lg-0 d-flex align-items-center justify-content-start">
                      <i class="fa-sharp fa-solid fa-star-half-stroke"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="col-12 col-lg-3 d-flex align-items-center justify-content-end">
                      <i class="fa-solid fa-arrow-right text-primary"></i>
                    </div>
                  </div>
              </div>
            </div>
          </div>`;
        });
    })
    .catch(e=>console.log(e));
}
