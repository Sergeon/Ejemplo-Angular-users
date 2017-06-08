# Ejemplo-Angular-users

## rama listado-basico

### pasos para realizar el ejercicio

Partiendo de un proyecto nuevo generado con el comando `ng new`, vamos a necesitar un componente con el listado de usuarios y un componente con el detalle del usuario.

Para ello, vamos a crear un módulo `users` que representa nuestro dominio de usuarios. Una vez creado, ahí dentro tendremos nuestros componentes `users-list` y `user-card`, y también nuestro `users.service.ts` que nos proveerá de una lista de usuarios de github.

Para crear el módulo hacemos:

`npm run ng -- g module users`

Y ahora, tendremos una nueva carpeta `src/app/users/` con un fichero `users.module.ts`.

En este punto, nuestro módulo `users` no hace nada muy útil y además el módulo `app.module` no tiene conocimiento de él. Antes de arreglar eso, vamos a crear el componente `users-list`. Este componente `users-list` es el que vamos a renderizar en el html de la aplicación. Para crearlo, ejecutamos:

`npm run ng -- g component users/users-list --export`

Nota que indicamos la ruta desde la carpeta users, para que este componente sea interno al módulo de users. Esto hará que `angular-cli` entienda que el módulo que es responsable de declarar este componente sea el módulo de users. 

Además, como hemos usado el flag `--export`, el módulo de `users` exportará el componente. **Esto es fundamental para que la aplicación pueda utilizar el módulo**.

Una vez hecho esto, queremos mostrar este componente `users-list` en la aplicación. Para ello, tendremos que modificar el html de la aplicación para renderizar este componente:

`src/app/app.component.html`

```html
<app-users-list></app-users-list>
```

Sin embargo, solamente esto no es suficiente -resultaría en un error-. El componente app no sabe nada todavía de nuestro componente `users-list`. Para poder usarlo, tenemos que importar el módulo `users` en el módulo `app`.

Como norma general, para poder utilizar un componente, directiva, o pipe de Angular, debemos importar, en el módulo que nos interese, **el módulo que declare y exporte ese componente**. (realmente es un poco más complejo, porque se pueden dar casos en los que un módulo re-exporta un componente declarado por otro, pero eso lo veremos más adelante).

Además es importante tener en cuenta que no es lo mismo **declarar** que **exportar** un módulo, y que si olvidamos una de las dos cosas nuestra aplicación no funcionará adecuandamente.

por tanto, para poder renderizar la aplicación debemos añadir `UsersModule` como import a nuestro `app.module.ts`:

```typescript
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Es importante notar que es necesario importarlo como *es6 module* (el import que aparece arriba), y como dependencia del módulo de Angular (en el listado de imports en el decorador *@NgModule*). Si usamos visual studio code, simplemente añadirlo en el listado de imports bastará para que el editor importe el *es6 module* por nosotros.

Una vez hecho esto, tenemos que modificar el componente `users-list.component.ts` para que utilice nuestro servicio de usuarios. De este modo, podremos renderizarlo en el html. 

Nuestro componente `users-list.component.ts` quedará así:

```typescript
import { Component, OnInit } from '@angular/core';
import { users } from './../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;
  constructor() { }

  ngOnInit() {
    this.users = users;
  }

}
```

Y, para visualizar prematuramente la lista de usuarios en el html, cambiaremos el html de la lista de usuarios así:

`src/app/users/users-list/users-list.component.ts`

```html
<div>
  {{ users | json }}
</div>
```

Ahora, podríamos seguir como en el listado de films. Sin embargo, en este caso, queremos añadir un modelo `User` a nuestra aplicación para asegurarnos de que los objetos con los que estamos tratando tienen un tipo determinado.

Esto evita errores, y además nos ayuda enormemente durante el desarrollo facilitante que nuestro IDE o editor de texto nos ayude con el autocompletado.

Aunque no es muy útil, angular-cli también nos ayuda un poco creando interfaces o clases. En este caso, podemos hacer:

`npm run ng -- g interface users/user`

y generará un fichero `user.ts` con el siguiente código boilerplate:

```typescript
export interface User {
}
```

No es muy útil, pero podemos completarlo para definir nuestro modelo de usuario. El fichero de usuarios, que es un mock de la api de github, nos devuelve datos como 'login', que es el nombre del usuario, el booleano 'site_admin', o el link a su página de github, 'link_url'. Además, nos devuelve más información. 

Por ahora, a nosotros nos interesan solamente cuatro cosas de un usuario: su nombre, su página, su imagen de avatar y saber si es administrador o no. Además, para desacoplar nuestra aplicación de la api de github, definiremos estos datos de la forma que a nosotros nos resulta más cómoda. Por ejemplo, definiremos la interfaz User como sigue:

```typescript
export interface User {
    username: string;
    site: string;
    avatar: string;
    isAdmin: boolean;
}
```

Ahora, tenemos que modificar nuestro `users-list.component.ts` para que la variable users que estamos manejando se adecúe a este nuevo tipo de dato. Al declararla, al principio de la clase `UsersListComponent`, lo haremos como sigue:

```typescript
import { Component, OnInit } from '@angular/core';
import { users } from './../users.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  constructor() { }

  ngOnInit() {
    this.users = users;
  }

}
```

Indicando que la variable es un array de Users. En este punto, el visual studio code empezará a quejarse, porque sabe que la constante `users` del servicio de usuarios no devuelve objetos que se adecúen a esta nueva interfaz.

Para ello, debemos transformar los usuarios que devuelve el servicio a objetos que se adecúen a la interfaz:

```typescript
ngOnInit() {
    this.users = users.map( user => ({
      username: user.login,
      site: user.html_url,
      avatar: user.avatar_url,
      isAdmin: user.site_admin
    }) );
  }
```

Invocamos `map` sobre users y, como callback, pasamos una arrow function que convierte cada usuario en un nuevo objeto que cumple con nuestra interfaz.

Ahora nuestra interfaz volverá a funcionar, Aunque todavía mostrará solamente el listado de usuarios como un array. Para maquetar correctamente la visión de los usuarios creamos un componente `user-card`:

`npm run ng -- g component users/user-card`

Nota que ahora no tenemos que exportar el componente, porque el resto de la aplicación -en el caso de nuestra aplicación de juguete, el componente `app.component.ts`- no lo utiliza: solamente `users-list` utiliza el compoenent `user-card`, y como los dos son declarados por el mismo módulo, pueden verse entre sí sin problemas.

Bien, una vez declarado nuestro componente, tenemos formatear su html:

`src/app/users/user-card/user-card.component.html`

```html
<div class="user">
  <h1>{{user.username}}</h1>
  <a [href]="user.site">{{user.username}}'s github page</a>
  <img [src]="user.avatar" [alt]="user.username">
</div>
```

La variable `user` que estamos utilizando aquí no está declarada en el componente, por lo que el editor se quejará (la aplicación, sin embargo, no se rompe: nadie está utilizando `user-card` todavía). Tenemos que declarar en el componente. Además, como va a ser el `users-list` quien va a determinar, en cada caso, qué usuario tiene que renderizarse en una tarjeta `user-card`, debemos usar el decorador `Input` al declararla:

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
```

Ahora, solo queda modificar el html del listado de usuarios para utilizar nuestra tarjeta:

```html
<div class="users-wrapper">
  <app-user-card *ngFor="let user of users"[user]="user"></app-user-card>
</div>
```
En este punto ya vemos las nuevas tarjetas con los datos de los usuarios. Por último, nunca está de más añadir un poco de estilo:

`src/app/users/user-card/user-card.component.css`

```css
.user{
    margin: 20px;
    background-color: darkslategray;
    color: white;
    padding: 20px;
    text-align: center;
    width : 350px;
    border-radius: 7px;
    display : inline-block;
}
a{
    display: block;
    color: deeppink;
}

a, p{
    margin-bottom: 10px;
}

img{
    display: block;
    margin: 30px auto;
    border-radius: 50%;
    width : 90px;
}

a:hover{
    cursor: pointer;
    color: white;
}
```








