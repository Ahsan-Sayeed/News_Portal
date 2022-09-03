const catagoryUrl = 'https://openapi.programming-hero.com/api/news/categories';
const newsUrl = 'https://openapi.programming-hero.com/api/news/category/';
const newsDetailsUrl = 'https://openapi.programming-hero.com/api/news/';
const catagoryContainer = document.getElementById('catagoryContainer');
const newsContainer = document.getElementById('newsContainer');
const itemFound = document.getElementById('itemFound');

fetch(catagoryUrl)
.then(e=>e.json())
.then(e=>{
    e.data.news_category.forEach(v=>{
        catagoryContainer.innerHTML += `<a class="nav-item nav-link catagory" href="#" onclick="getData('${v.category_id}','${v.category_name}')">${v.category_name}</a>`;
    });
})
.catch(e=>console.log(e));

//selection
catagoryContainer.addEventListener('click',(e)=>{
  for(let i=0;i<document.getElementsByClassName('catagory').length;i++){
    document.getElementsByClassName('catagory')[i].classList.remove('isOptionActive');
  }
  e.target.classList.add('isOptionActive');
})

// by default active 
getData('01','Breaking News');

function getData(catagoryId,catagoryName){
    document.getElementById('spinner').classList.remove('d-none');
    newsContainer.innerHTML="";
    fetch(newsUrl+catagoryId)
    .then(e=>e.json())
    .then(e=>{
        itemFound.innerText = e.data.length!==0?`${e.data.length} items found for category ${catagoryName}`:`No items found for catagory ${catagoryName}`;
        e.data.forEach(v=>{
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
                        <span style="font-size:14px;font-weight: 500;white-space: nowrap;">${v.author.name===null||v.author.name===''?'No data available':v.author.name}</span>
                        <span style="font-size:12px; white-space;nowrap;">${v.author.published_date===null?"No data available":v.author.published_date}</span>
                      </div>
                    </div>
                    <div class="col d-flex align-items-center  justify-content-lg-start justify-content-end">
                      <i class="fa-regular fa-eye"></i>&nbsp
                      <span>${v.total_view===null?"No data available":v.total_view}</span>
                    </div>
                    <div class="col-12 col-lg-3 mt-3 mt-lg-0 d-flex align-items-center justify-content-start">
                      <i class="fa-sharp fa-solid fa-star-half-stroke"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="col-12 col-lg-3 d-flex align-items-center justify-content-end">
                    
                    <!-- Button trigger modal -->
                    <button type="button" class="btn border border-0" data-toggle="modal" data-target="#exampleModalCenter" onclick="newsDetails('${v._id}')">
                    <i class="fa-solid fa-arrow-right text-primary"></i>
                    </button>
                
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">d...dynamic title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="background-color:transparent;border:none">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <div class="d-flex">
                                <img src="" id='authorImage' class='ms-2 me-3' style="height:50px;width:50px;border-radius:100%">
                                <div style='line-height:0'>
                                    <h6 class='mt-2' id="authorName">author name</h6>
                                    <span style="font-size:12px;" id="autorTimeData">Time and date</span>
                                </div>
                            </div>
                
                            <img src="" id="modalImage" class="img-fluid my-5">
                            <div id="modalBody">
                            ...dynamic body
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>`;
        });
        document.getElementById('spinner').classList.add('d-none');
    })
    .catch(e=>console.log(e));
}

function newsDetails(id){
    fetch(newsDetailsUrl+id)
    .then(e=>e.json())
    .then(e=>{
        e.data.forEach((value)=>{
            document.getElementById('exampleModalLongTitle').innerText = value.title;
            document.getElementById('modalImage').src = value.image_url;
            document.getElementById('modalBody').innerText = value.details;
            document.getElementById('authorImage').src= value.author.img;
            document.getElementById('authorName').innerText = value.author.name===null||value.author.name===''?"No data available":value.author.name;
            document.getElementById('autorTimeData').innerText = value.author.published_date===null?"No data available":value.author.published_date;
            console.log(value.img)
        });
    })
    .catch(e=>console.log(e));
}