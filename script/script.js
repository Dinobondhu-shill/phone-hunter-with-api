
const loadPhone = async (searchText='13', isShowAll) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phone = data.data
  showPhone(phone, isShowAll)
}

const showPhone = (phones, isShowAll) =>{
  const phoneContainer = document.getElementById('phone-container')
  // clear photo container before show new element
  phoneContainer.textContent = ''
// hide show all button if item are less then 12
const showAllButton = document.getElementById('show-all-button')
if(phones.length > 12 && !isShowAll){
  showAllButton.classList.remove('hidden')
}
else{
  showAllButton.classList.add('hidden')
}

  // show only 12 phone at once
  if(!isShowAll){
    phones = phones.slice(0,12);
  }
  // get one by one phone
  phones.forEach(phone =>{
    const phoneDetails = document.createElement('div')
    phoneDetails.classList = `card bg-base-100 border-2`;
    phoneDetails.innerHTML= `
    
    <figure class="px-10 pt-10">
      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title font-bold">${phone.phone_name}</h2>
      <p></p>
      <h3 class="text-2xl font-extrabold">$999</h3>
      <div class="card-actions">
        <a onclick="showDetails('${phone.slug}')" class="px-6 py-3 w-fit text-white font-bold bg-[#0D6EFD] cursor-pointer rounded-xl">Show Details</a>
      </div>
    </div>
    
    `
    phoneContainer.appendChild(phoneDetails)

  });
  handleLoader(false)
}

// search button handler
const buttonHandler = (isShowAll) =>{
  handleLoader(true);
 const searchField = document.getElementById("search-bar")
 const searchText = searchField.value;
 loadPhone(searchText, isShowAll)
}
// showing spinner and disappear loader
const handleLoader = (isLoading) =>{
  const loader = document.getElementById('loader')
  if(isLoading){
    loader.classList.remove('hidden')
  }
  else{
    loader.classList.add('hidden')
  }
}
// show all item after clicking show all button
const showAll = () =>{
  buttonHandler(true);
  
}
// show details of phone
const showDetails = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
 console.log(data)
 showDetailsOfPhone(data)
}

const showDetailsOfPhone =(phone) =>{
  my_modal_5.showModal()
  const modal = document.getElementById('modal-details')
  modal.innerHTML =`
  <div>
      <img src="${phone?.data?.image}" class ="mx-auto">
    <h3 class="font-bold text-lg">${phone?.data?.name}</h3>
    <p class="py-1">Press ESC key or click the button below to close</p>
    <h2><span class="font-bold text-[18px] mr-3">Storage :</span>${phone?.data?.mainFeatures?.storage}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Display Size :</span>${phone?.data?.mainFeatures?.displaySize}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Chipset :</span>${phone?.data?.mainFeatures?.chipSet}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Memory :</span>${phone?.data?.mainFeatures?.memory}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Slug :</span>${phone?.data?.slug}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Release data :</span>${phone?.data?.releaseDate}</h2>
    <h2><span class="font-bold text-[18px] mr-3">Brand : </span>${phone?.data?.brand}</h2>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  
  `
}
loadPhone()