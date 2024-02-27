
const loadPhone = async (searchText) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phone = data.data
  showPhone(phone)
}

const showPhone = phones =>{
  const phoneContainer = document.getElementById('phone-container')
  // clear photo container before show new element
  phoneContainer.textContent = ''
// hide show all button if item are less then 12
const showAllButton = document.getElementById('show-all-button')
if(phones.length > 12){
  showAllButton.classList.remove('hidden')
}
else{
  showAllButton.classList.add('hidden')
}
  // show only 12 phone at once
  phones = phones.slice(0,12);
  // get one by one phone
  phones.forEach(phone =>{
    console.log(phone)
    const phoneDetails = document.createElement('div')
    phoneDetails.classList = `card bg-base-100 border-2`;
    phoneDetails.innerHTML= `
    
    <figure class="px-10 pt-10">
      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title font-bold">${phone.phone_name}</h2>
      <p>${phone.slug}</p>
      <h3 class="text-2xl font-extrabold">$999</h3>
      <div class="card-actions">
        <a href="" class="px-6 py-3 w-fit text-white font-bold bg-[#0D6EFD] rounded-xl">Show Details</a>
      </div>
    </div>
    
    `
    phoneContainer.appendChild(phoneDetails)

  });
  handleLoader(false)
}

// search button handler
const buttonHandler = () =>{
  handleLoader(true);
 const searchField = document.getElementById("search-bar")
 const searchText = searchField.value;
 loadPhone(searchText)
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
