# Demo

## `master` branch

https://order-book-gamma.vercel.app

## `table-performance` branch

The branch with a more performant `Table` component replacing `Table` from `@mui/material` in favour of a lower level implementation (it has been wasting time on CSS-in-JS logic).

Moreover, because of a [bug in Safari](https://stackoverflow.com/a/54432971/3945641) with setting `background` for the `table-row` elements, it's better to use own implementation not based on `<table>`. 

https://order-book-git-table-performance-sebastiancrow.vercel.app
