function navbar (){
    return `
    <div class = "head">

    <div class="nav2">
    <div class="nav2-1">
   <nav>
    
      <div class="wrappe">
       
        <input type="radio" name="slider" id="menu-btn">
        <input type="radio" name="slider" id="close-btn">
        <ul class="nav-links">
          <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
          
          <li>
            <a href="*****.html" class="desktop-item">Medicines</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Medicines</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                  <li><a href="">Health & Care</a></li>
                  <li><a href="">Beauty Care</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a href="#" class="desktop-item">Doctors</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Doctors</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Physiotherapy</a></li>
                    <li><a href="#">Health Specialist</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
         
          <li>
            <a href="#" class="desktop-item">Pharmacy</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Pharmacy</label>
          </li>
         

          <li>
            <a href="#" class="desktop-item">Other Services</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Other Services</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Hospital</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
         
        </ul>

        <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars" style="margin: 10px 0px 0px -90px;"></i></label>
      </div>

    </nav>
      </div> 

    <div class="nav2-2">
        <input type="text" placeholder="Search..." id="search">
        <i class="fa-solid fa-cart-shopping fa-2xl" style="color: #00525d; margin-left:20px;"></i>
        <button class="btn-1">Consult Now</button>
      </div>
      
  </div>

</div>
    `
}
export default navbar;