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



