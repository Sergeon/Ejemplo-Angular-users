# Ejemplo-Angular-users

## rama filtros

### pasos para realizar el ejercicio

Partimos del estado de la aplicación tal y como la hemos dejado en la rama `listado`. Ahora queremos añadir tres botones a la página de listado de usuarios para decidir si queremos mostrar a los administradores, a los no administradores o a todos.

Hasta ahora, hemos separado nuestros componentes `users-list` y `user-card`, pero realmente no era una separación muy necesaria porque no había ninguna funcionalidad específica del listado, a parte de mostrar a todos los usuarios.

Sin embargo, ahora que vamos a añadir filtros a la aplicación, va a quedar mucho más clara la separación de responsabilidades entre los dos componentes: el listado es el responsable de decidir cuáles usuarios se muestran, mientras que `user-card` simplemente muestra y formatea la información de cada usuario.

___

Lo primero que vamos a hacer es modificar nuestra `user-card` para mostrar a los administradores con un color diferente al resto. Para esto usaremos la directiva `class.`:

`src/app/users/user-card/user-card.component.html`

```html
<div class="user" [class.admin]="user.isAdmin">
  <h1>{{user.username}}</h1>
  <a [href]="user.site">{{user.username}}'s github page</a>
  <img [src]="user.avatar" [alt]="user.username">
</div>
```

`src/app/users/user-card/user-card.component.css`

```css
...
.user.admin {
    background-color: lightskyblue;
}
...
```




