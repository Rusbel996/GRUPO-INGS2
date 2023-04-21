import { useLocation } from "react-router-dom"
import styles from "../styles/perfil.module.css"
import { useRef } from "react"


const Perfil = () => {
    return (
        <main>
      <div class="container"/>
      <div class="row">
      <form method="post" id="perfil">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 toppad" >
   
   
          <div class="panel panel-success">
              <h2 class="panel-title"><center><font size="5"><i class='glyphicon glyphicon-user'></i>PERFIL</font></center></h2>

            <div class="panel-body">
              <div class="row">
			  
                <div class="col-md-3 col-lg-3 " align="center"> 
				<div id="load_img">
					<img class="img-responsive" src="" alt="Logo"/>
					
				</div>
							
					<div class="row">
  						<div class="col-md-12">
							<div class="form-group">
								<input class='filestyle' data-buttonText="Logo" type="file" name="imagefile" id="imagefile" onchange="upload_image();"/>
							</div>
						</div>
						
					</div>
				</div>
                <div class=" col-md-9 col-lg-9 "> 
                  <table class="table table-condensed">
                    <tbody>
                      <tr>
                        <td class='col-md-3'>Nombres y Apellidos:</td>
                        <td><input type="text" class="form-control input-sm" name="nombre_apellido" value="text"/></td>
                      </tr>
                      <tr>
                        <td>Ocupación:</td>
                        <td><input type="text" class="form-control input-sm" name="ocupacion" value="" required/></td>
                      </tr>
                      <tr>
                        <td>Correo electrónico:</td>
                        <td><input type="email" class="form-control input-sm" name="correo" value=""/></td>
                      </tr>
					  <tr>
                        <td>Telefono:</td>
                        <td><input type="text" class="form-control input-sm" required name="telefono" value=""/></td>
                      </tr>

					
                      
					  <tr>
                        <td>Ciudad:</td>
                        <td><input type="text" class="form-control input-sm"  required/></td>
                      </tr>
					  
                   
                    </tbody>
                  </table>
                  
                  
                </div>
				<div class='col-md-12' id="resultados_ajax"></div>
              </div>
            </div>
                 <div class="panel-footer text-center">
                    
                     
                <button type="submit" class="btn btn-sm btn-success"><i class="glyphicon glyphicon-refresh"></i> Guardar Cambios</button>

                       
                       
                    </div>
            
          </div>
        </div>
		</form>
      </div>

	
	

        </main>
    )
}

export default Perfil