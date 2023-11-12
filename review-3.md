# ¿Qué es mi producto?

Mi producto es una aplicación de lista de tareas ✅.

# ¿Para que sirve?

Se ha diseñado para ayudar a los usuarios a administrar y organizar sus actividades diarias, proyectos y responsabilidades de manera eficiente y sin complicaciones. Con mi aplicación, los usuarios pueden crear, editar, eliminar y visualizar sus tareas en una lista. Permitiéndoles mantenerse enfocados en sus objetivos y tareas pendientes.

# ¿Cuáles son las funcionalidades más importantes?

- :bust_in_silhouette: :on: :computer: Es un servidor que permite recibir, procesar y responder a las solicitudes de los clientes, siguiendo los principios de la arquitectura REST API. :computer:
- :ballot_box_with_check: Tasks List es un servidor construido con la tecnologia Node js y el Framework Express js. :computer:
- :open_file_folder: Almacenar tareas en un archivo JSON :bookmark_tabs:
- :repeat: Recibir peticiones mediante verbos HTTP

- :closed_lock_with_key: Proceso de autenticacion :key:
- :closed_lock_with_key: Proceso de autorizacion :key:

# ¿Porque los usuarios las usarían?

Tasks List es la mejor opcion para recibir y procesar solicitudes de los clientes de una manera agil, eficaz y segura

> - [x] autenticación <br>
> Es el proceso mediante el cual verificamos la identidad de un usuario, generalmente a través de un par de credenciales, como un nombre de usuario y una contraseña. En este contexto, utilizaremos JSON Web Tokens (JWT) como una forma efectiva de gestionar la autenticación, lo que permitirá a los usuarios acceder de manera segura a los recursos de nuestra aplicación.

> - [x] Autorización <br>
> Se refiere a los permisos otorgados a diferentes tipos de clientes que realizan solicitudes a nuestro servidor web. Estos permisos se utilizan para limitar las acciones que cada tipo de cliente puede realizar, con el objetivo de proteger recursos web que contienen información sensible. Esto asegura que solo los usuarios autorizados puedan acceder y realizar operaciones en estos recursos.

---

| Verbo HTTP | URL del recurso | Accion                            | HTTP status                                                                 |
| ---------- | --------------- | --------------------------------- | --------------------------------------------------------------------------- |
| POST       | /tasks          | Crear una tarea nueva en la lista | 201 - Created <br> 400 - Bad Request                                        |
| GET        | /tasks          | Obtener lista de tareas           | 200 - Ok <br> 204 - Not content <br> 404 - Not found                        |
| GET        | /tasks{id}      | Obtener una tarea de la lista     | 200 - Ok <br> 204 - Not content <br> 400 - Bad Request <br> 404 - Not found |
| DELETE     | /tasks{id}      | Eliminar una tarea de la lista    | 204 - Not content <br> 400 - Bad Request <br> 404 - Not found               |
| PUT        | /tasks{id}      | Actualizar una tarea de la lista  | 200 - Ok <br> 400 - Bad Request <br> 404 - Not found                        |
