

<div class="sidebar">
    <div class="logo_content">
      <div class="logo">
        <i class='bx bxl-c-plus-plus'></i>
        <div class="logo_name">MYPYME</div>
      </div>
      <i class='bx bx-menu' id="btn" ></i>
    </div>
    <ul class="nav_list">
      
      <li>
        <a href="#">
          <i class='bx bx-grid-alt' ></i>
          <span class="links_name">Inicio</span>
        </a>
        <span class="tooltip" >Dashboard</span>
      </li>
      <li>
        <a  href="index.php">
          <i class='bx bx-user' ></i>
          <span class="links_name">Clientes</span>
        </a>
        <span class="tooltip">User</span>
      </li>
      <li>
        <a href="productos.php">
          <i class='bx bx-chat' ></i>
          <span class="links_name">Productos</span>
        </a>
        <span class="tooltip">Messages</span>
      </li>
      <li>
        <a href="proveedor.php">
          <i class='bx bx-pie-chart-alt-2' ></i>
          <span class="links_name">Proveedores</span>
        </a>
        <span class="tooltip">Analytics</span>
      </li>
      <li>
        <a href="inventario.php">
          <i class='bx bx-folder' ></i>
          <span class="links_name">Analítica</span>
        </a>
        <span class="tooltip">Files</span>
      </li>
      <li>
        <a href="ventas.php">
          <i class='bx bx-cart-alt' ></i>
          <span class="links_name">Ventas</span>
        </a>
        <span class="tooltip">Order</span>
      </li>
      <li>
        <a href="perfil.php">
          <i class='bx bx-heart' ></i>
          <span class="links_name">Perfil</span>
        </a>
        <span class="tooltip">Saved</span>
      </li>
      <li>
        <a href="compras.php">
          <i class='bx bx-cog' ></i>
          <span class="links_name">Otros</span>
        </a>
        <span class="tooltip">Setting</span>
      </li>
    </ul>
    
    <div class="profile_content">
      <div class="profile">
        <a href="login_dist">
          <i class='bx bx-log-out' id="log_out" ></i>
        </a>
      </div>
    </div>
  </div>


  

  <script>
   let btn = document.querySelector("#btn");
   let sidebar = document.querySelector(".sidebar");

   btn.onclick = function() {
     sidebar.classList.toggle("active");
     if(btn.classList.contains("bx-menu")){
       btn.classList.replace("bx-menu" , "bx-menu-alt-right");
     }else{
       btn.classList.replace("bx-menu-alt-right", "bx-menu");
     }
   }
  
  </script>


  <script>
  const logout = document.querySelector("#log_out")

  logout.addEventListener('click', e => {
      e.preventDefault();
      auth.signOut().then(() => {
          console.log('sign out')
          location.href ='login_dist'
      })

  })  
  </script>