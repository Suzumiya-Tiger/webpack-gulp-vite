

# CommonJS模块化实现原理

CommonJS 是一种用于 JavaScript 代码模块化的规范，它主要用于服务器端的 JavaScript 环境，比如 Node.js。

CommonJS 规范定义了如何创建模块、导出模块、引入模块等一系列规则，以使得 JavaScript 代码更易于维护和组织。

**其核心就是为了实现JS的模块化应用和模块化管理。**

## module.exports

在 CommonJS 模块系统中，`module.exports` 是一个对象，而 `exports` 是对 `module.exports` 的引用。当你使用 `module.exports` 导出一个对象时，`exports` 和 `module.exports` 现在指向了两个不同的对象。这是因为 `exports` 只是 `module.exports` 的一个引用，而不是一个独立的对象。

## **模块缓存** 

为了提高性能，Node.js 使用了模块缓存。当一个模块被第一次 `require` 加载后，它会被缓存，以后再次 `require` 相同的模块时，将从缓存中获取，而不是重新加载。这样可以减少文件系统的 I/O 操作，提高性能。

## **同步加载**

CommonJS 模块加载是同步的，即在模块加载完成之前，程序会阻塞在 `require` 的位置。这种同步加载在服务器端的应用中通常不会造成太大问题，但在浏览器端可能会导致性能问题。因此，在浏览器端更常见的是使用异步加载模块的方式，例如使用 AMD（Asynchronous Module Definition）规范。



# ES Module实现原理

ES Module（ECMAScript Modules）是 JavaScript 的官方模块系统，引入了 `import` 和 `export` 关键字来实现模块化。与 CommonJS 不同，ES Module 是在语言层面实现的，不需要运行时加载器。

import和export是在静态编译阶段执行的，而非代码运行阶段(运行时环境)执行的。

以下是 ES Module 实现原理的主要步骤：

1. **声明模块：** 使用 `export` 关键字声明要导出的变量、函数或类，使用 `import` 关键字引入其他模块的成员。

   ```js
   // math.js
   export const add = (a, b) => a + b;
   
   // main.js
   import { add } from './math';
   ```

2. **异步加载：** ES Module 使用异步加载模块，这意味着模块只有在需要时才会被加载。这是通过 `import()` 函数实现的，该函数返回一个 Promise。

   ```js
   // main.js
   import('./math').then(mathModule => {
     console.log(mathModule.add(2, 3)); // 输出 5
   });
   ```

3. **模块缓存：** 类似于 CommonJS，ES Module 也使用模块缓存，确保每个模块只被加载一次。当模块被第一次加载后，它会被缓存，以后再次加载时会从缓存中获取。

4. **静态解析：** ES Module 的导入语句在编译阶段就会被静态解析，这意味着导入的模块路径必须是静态的，不能在运行时动态生成。这有助于提前确定模块之间的依赖关系，使得代码更加可靠。

   在 ES Modules 中，`import` 语句确实在编译阶段进行静态解析，这意味着模块路径必须是静态的、固定的，不能在运行时动态生成。例如：

   ```js
   // 编译阶段静态解析
   import { func } from 'my-module';
   ```

   这里的 `'my-module'` 是一个静态字符串，编译器会在编译阶段解析这个路径，并确定加载哪个模块。

   但是，ES Modules 也提供了 `import()` 函数，它是一个动态 `import`，允许在运行时动态加载模块。这是一种特殊情况，不同于静态解析的常规 `import` 语句。

   ```js
   // 运行时动态生成
   import('my-module').then((module) => {
     // 可以在这里使用动态加载的模块
   });
   ```

   使用 `import()` 可以在运行时根据需要动态加载模块，这样的动态 `import` 不会在编译阶段被静态解析，因此不受固定模块路径的限制。

   总体而言，静态解析的限制适用于常规的 `import` 语句，而运行时的 `import()` 允许在需要时动态加载模块，这两者在行为上是有区别的。

5. **顶层作用域：** 每个模块都有自己的顶层作用域，模块中声明的变量不会泄漏到全局作用域。这有助于提高代码的可维护性和可靠性。

6. **单一实例：** 每个 ES Module 在引用过程中只会被加载一次，并且会在内存中保持单一实例。这是通过内建的模块单例特性实现的。

7. **循环依赖处理：** ES Module 也能处理循环依赖，但与 CommonJS 不同的是，ES Module 会解析出模块中导入的变量，但这些变量在模块加载时可能尚未完全赋值。

总的来说，ES Module 的实现原理涉及异步加载、模块缓存、静态解析、顶层作用域等概念，它提供了一种更现代、更强大的模块化机制，适用于浏览器和现代的 JavaScript 运行时环境。

## 什么是模块的顶层作用域

1. **独立性：** 每个模块拥有自己的顶层作用域，意味着在一个模块中声明的变量、函数、类等，不会污染其他模块的作用域。这使得每个模块都可以被视为一个相对独立的单元，有助于减少命名冲突和代码耦合。

2. **隔离性：** 模块的顶层作用域隔离于全局作用域，因此在模块中声明的变量不会自动成为全局变量。这就意味着，即使你在模块中使用了 `var` 关键字声明一个变量，它也不会自动成为全局对象的属性。

   ```js
   // module.js
   var x = 10;
   console.log(x); // 输出 10
   console.log(globalThis.x); // 输出 undefined，不会污染全局作用域
   ```

3. **变量不泄漏：** 在模块中声明的变量不会泄漏到其他模块的作用域中。这意味着在一个模块中使用 `var`、`let`、`const` 声明的变量只在当前模块可见，不会影响其他模块。

   ```js
   // module1.js
   var x = 10;
   
   // module2.js
   console.log(x); // 输出 undefined，不会访问到 module1.js 中的 x
   ```

这种模块作用域的设计有助于降低命名冲突、提高代码的可维护性，同时也符合现代 JavaScript 的模块化理念。在模块中声明的变量通常只在该模块内部使用，而不必担心对其他模块产生不良影响。

# CommonJS加载ES Module的原理

CommonJS 是一种模块化规范，而 ES Module (ECMAScript Modules) 是 JavaScript 的官方模块系统。

1. **使用 Babel 或类似工具进行转换：** CommonJS 和 ES Module 有不同的语法和模块系统实现。为了在 CommonJS 环境中加载 ES Module，你通常需要使用 Babel 或其他类似的工具将 ES Module 的代码转换成 CommonJS 格式。这个转换过程涉及将 ES Module 的 `import` 和 `export` 语句转换为 CommonJS 的 `require` 和 `module.exports` 语句。

2. **使用 require 函数加载：** 在 CommonJS 中，通常使用 `require` 函数来加载模块。当你尝试使用 `require` 加载一个 ES Module 时，由于语法不同，通常需要借助转换工具，确保 ES Module 的代码在 CommonJS 环境中能够正确执行。

   ```js
   // ES Module: math.js
   export const add = (a, b) => a + b;
   
   // CommonJS: main.js
   const math = require('./math');
   console.log(math.add(2, 3)); // 输出 5
   ```

3. **处理导出的对象：** ES Module 中的模块通常通过 `export` 导出对象，而 CommonJS 使用 `module.exports`。在转换时，工具会将 ES Module 中的导出对象转换成一个包含在 `module.exports` 中的对象，以确保 CommonJS 环境正确处理导出。

4. **注意异步加载的问题：** ES Module 支持动态 `import()`，而 CommonJS 是同步加载模块的。如果 ES Module 中使用了动态 `import()`，在 CommonJS 环境中可能需要特殊处理，可能需要使用额外的工具或库来模拟动态加载。

需要强调的是，虽然可以在 CommonJS 环境中加载 ES Module，但这通常是为了适应两者不同的模块系统。如果你的项目环境支持 ES Module，推荐直接使用 ES Module，避免不必要的转换。

# ES Module加载CommonJS的原理

ES Module加载CommonJS模块的原理涉及到两种不同的模块系统之间的兼容性问题。需要注意的是，由于 CommonJS 和 ES Module 有一些基本的设计差异，因此直接在 ES Module 中加载 CommonJS 模块并不总是无痛的。以下是一些可能的解释和实践：

1. **使用 Babel 或 TypeScript：** 一种常见的方法是使用 Babel 或 TypeScript 这样的工具，通过配置适当的插件，将 CommonJS 模块转换为 ES Module。这样，你就可以在 ES Module 中直接加载被转换后的模块。

   ```
   javascriptCopy code// CommonJS Module: math.js
   module.exports = { add: (a, b) => a + b };
   ```

   ```
   javascriptCopy code// ES Module: main.js
   import math from './math'; // Babel 或 TypeScript 会将这里的 import 转换为适当的 require
   console.log(math.add(2, 3)); // 输出 5
   ```

2. **使用`import()`动态加载：** 在 ES Module 中可以使用动态 `import()` 来异步加载 CommonJS 模块。这样可以避免一些兼容性问题，因为 `import()` 提供了更灵活的加载方式。需要注意的是，这种方式可能会引入异步的特性，需要使用 `then` 来处理结果。

   ```
   javascriptCopy code// ES Module: main.js
   import('./math').then(math => {
     console.log(math.add(2, 3)); // 输出 5
   });
   ```

   在这种情况下，Babel 或 TypeScript 通常也会在编译时做一些转换以确保动态 `import()` 的正确执行。

# source-map

在webpack里面通过写入devtool:"eval"打开sourcemap调试模式。

Mode拥有生产，开发，none三种模式。

![image-20231212153926192](./readme.assets/image-20231212153926192.png)

**source-map的作用是从已转换的代码，映射到原始的源文件。**

使得浏览器可以重构原始源，并且在调试器中显示重建的原始源。

## source-map文件

一般都存在打包文件夹里面，本项目是基于eval模式生成的bundle.js.map，常见有以下代码：

```js
{
  "version": 3,
  "file": "bundle.js",
  "mappings": "mBAOAA,QAAQC,IAAIC,OCLZF,QAAQC,IADQ,eAIdD,QAAQC,IAAI,Y",
  "sources": [
    "webpack://source_map/./src/utils/math.js",
    "webpack://source_map/./src/main.js"
  ],
  "sourcesContent": [
    "function add(num1, num2) {\r\n  return num1 + num2;\r\n}\r\nfunction sub(num1, num2) {\r\n  return num1 - num2;\r\n}\r\n\r\nconsole.log(count);\r\n\r\nexport { add, sub };\r\n",
    "import { add, sub } from \"./utils/math\";\r\nconst message = \"Hello World\";\r\nconsole.log(message);\r\n\r\nconst foo = () => {\r\n  console.log(\"foo start\");\r\n};\r\nfoo();\r\nadd(1, 2);\r\n"
  ],
  "names": [
    "console",
    "log",
    "count"
  ],
  "sourceRoot": ""
}

```

### 文件属性讲解

 version：当前使用的版本，也就是最新的第三版； 

 sources：从哪些文件转换过来的source-map和打包的代码（最初始的文件）； 

 names：转换前的变量和属性名称（因为我目前使用的是development模式，所以不需要保留转换前的名称）； 

 mappings：source-map用来和源文件映射的信息（比如位置信息等），一串base64 VLQ（veriable-length quantity可变 长度值）编码； 

 file：打包后的文件（浏览器加载的文件）； 

 sourceContent：转换前的具体代码信息（和sources是对应的关系）； 

 sourceRoot：所有的sources相对的根目录；



## devtool

下面几个值不会生成source-map 

- false：不使用source-map，也就是没有任何和source-map相关的内容。 
- **none：production模式下的默认值（什么值都不写） ，不生成source-map。** 
- eval：development模式下的默认值，不生成source-map 

​		 但是它会在eval执行的代码中，添加 //# sourceURL=； 

​		 它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；

### eval(开发环境默认模式)

1. **快速重建和构建速度：** 使用 `"eval"` 生成的 source map 是将源码嵌入到生成的代码中，而不是生成一个独立的文件。这样可以加速构建过程，因为不需要生成额外的文件，而是直接在内存中嵌入。
2. **准确的行和列信息：** 通过 `eval` 的方式，生成的 source map 可以提供准确的行和列信息，这对于在浏览器调试器中准确定位错误和断点非常有帮助。
3. **较小的输出体积：** 由于 source map 被嵌入到生成的代码中，因此生成的最终输出文件的体积相对较小，这有助于减小前端资源的加载时间。

但是，需要注意的是，使用 `"eval"` source map 会牺牲一些可读性和调试工具的功能。由于嵌入的 source map 包含在生成的代码中，可能会使代码变得复杂，不太适用于生产环境。在生产环境中，通常建议选择更适合生产环境的 source map 选项，例如 `"source-map"` 或 `"cheap-source-map"`。

在总体上，`"eval"` 是在开发环境下一种轻量级、快速的 source map 选项，适用于需要快速迭代和开发的场景。

### source-map(生产环境)

开发工具会在打包好的文件中根据//# sourceMappingURL=bundle.js.map找到source-map文件，并且进行解析。

### eval-source-map(开发环境)

`eval-source-map` 是 webpack 中一种用于开发环境的 `devtool` 配置，它生成的 Source Map 具有较好的性能和较高的质量，同时在浏览器调试器中提供准确的源代码映射。`eval-source-map` 在开发环境中是一个不错的选择，因为它提供了快速的重建速度和准确的调试信息。

以下是关于 `eval-source-map` 的一些主要特点和效果：

1. **快速重建速度：** 类似于 `"eval"`，`eval-source-map` 也将 Source Map 嵌入到生成的代码中，而不生成独立的文件。这有助于提高重建速度，因为不需要生成额外的文件。
2. **准确的源代码映射：** 与 `"eval"` 不同，`eval-source-map` 使用 `eval` 语句包裹源码，但同时生成一个 Source Map。这样在浏览器调试器中可以准确地映射回源代码，提供更好的调试体验。
3. **较小的输出体积：** 由于 Source Map 被嵌入到生成的代码中，因此最终输出的文件体积相对较小，这有助于减小前端资源的加载时间。
4. **较好的质量：** `eval-source-map` 生成的 Source Map 提供了较高的质量，可以准确地显示源代码的行、列信息，对于调试非常有帮助。

要使用 `eval-source-map`，可以在 webpack 配置文件中的 `devtool` 选项中进行配置：

```js
codemodule.exports = {
  // ...
  devtool: 'eval-source-map',
  // ...
};
```

需要注意的是，虽然在开发环境中 `eval-source-map` 提供了较好的调试体验，但在生产环境中一般不推荐使用。在生产环境中，可以选择更适合生产环境的 source map 选项，例如 `"source-map"` 或 `"cheap-source-map"`，以兼顾性能和可调试性。

### inline-source-map(开发环境)

`inline-source-map` 是 webpack 中用于开发环境的 `devtool` 配置的一种选项。它生成的 Source Map 将映射信息嵌入到生成的 bundle 文件中，而不是生成一个独立的文件。这样，开发者在浏览器调试器中可以直接访问嵌入的 Source Map，提供更好的调试体验。

以下是关于 `inline-source-map` 的一些主要特点和效果：

1. **嵌入到生成的文件中：** 与 `eval-source-map` 类似，`inline-source-map` 也将 Source Map 嵌入到生成的 bundle 文件中。这有助于提高重建速度，同时保持了较小的输出体积。
2. **直接在调试器中查看：** 由于 Source Map 被嵌入到生成的文件中，开发者在浏览器调试器中直接查看源代码时，可以立即获得准确的映射关系，提供了更好的调试体验。
3. **较好的调试体验：** 在浏览器调试器中，`inline-source-map` 会提供准确的源代码映射，包括行、列信息等，使开发者能够轻松地定位和解决问题。
4. **适用于开发环境：** `inline-source-map` 主要用于开发环境，因为嵌入 Source Map 会增加生成文件的体积，不太适用于生产环境，而在开发环境中则提供了更好的可调试性。

要使用 `inline-source-map`，可以在 webpack 配置文件中的 `devtool` 选项中进行配置：

```js
codemodule.exports = {
  // ...
  devtool: 'inline-source-map',
  // ...
};
```

总体而言，`inline-source-map` 是一种适用于开发环境的 Source Map 选项，它在提供较好的调试体验的同时，也考虑了重建速度和输出体积的平衡。

### cheap-source-map(推荐，开发环境)

1.会生成sourcemap，但是会更加高效一些（cheap低开销），因为它没有生成列映射（Column Mapping） 

2.因为在开发中，我们只需要行信息通常就可以定位到错误了，所以剔除掉列信息也大大提高了性能

![image-20231213112625654](./readme.assets/image-20231213112625654.png)

`cheap-source-map` 是 webpack 中用于开发环境的 `devtool` 配置的一种选项。与一些其他 Source Map 选项相比，它在提供调试信息的同时，试图在保持性能和构建速度方面取得一些平衡。以下是关于 `cheap-source-map` 的一些主要特点和效果：

1. **提供调试信息：** `cheap-source-map` 生成的 Source Map 提供了基本的调试信息，包括准确的行数和源代码映射。这使得在浏览器调试器中可以查看到源代码的正确位置。
2. **不包含列信息：** 与一些其他 Source Map 选项相比，`cheap-source-map` 不包含列信息。这意味着在调试器中的源代码映射可能不是非常准确，但在大多数情况下，行信息已经足够。
3. **相对较小的体积：** 由于不包含列信息，`cheap-source-map` 生成的 Source Map 通常相对较小。这有助于保持生成文件的较小体积，减少前端资源加载时间。
4. **适用于开发环境：** `cheap-source-map` 主要用于开发环境，因为它在提供基本的调试信息的同时，努力降低了生成文件的体积和重建速度。

要使用 `cheap-source-map`，可以在 webpack 配置文件中的 `devtool` 选项中进行配置：

```js
codemodule.exports = {
  // ...
  devtool: 'cheap-source-map',
  // ...
};
```

总的来说，`cheap-source-map` 是在开发环境中用于平衡性能和调试信息的一种 Source Map 选项。它提供了基本的调试支持，适用于需要在开发过程中快速定位问题的场景。

### cheap-module-source-map

1.cheap-module-source-map： 

​	 会生成sourcemap，类似于cheap-source-map，但是对源自loader的sourcemap处理会更好。 

2.这里有一个很模糊的概念：对源自loader的sourcemap处理会更好，官方也没有给出很好的解释 

​	 其实是如果loader对我们的源码进行了特殊的处理，比如babel；

#### cheap-module-source-map和cheap-source-map的区别

`cheap-source-map` 和 `cheap-module-source-map` 是 webpack 中用于开发环境的两个不同的 `devtool` 配置选项，它们在提供源码映射的同时有一些区别：

1. **`cheap-source-map`：**

   - 生成的 Source Map 相对较小，不包含列信息，只提供行信息的映射。
   - 适用于对文件体积敏感的场景，希望保持生成文件相对小巧的情况下进行调试。
   - 不包含模块信息，因此在源码映射中无法追踪到具体的模块路径和文件。

   ```js
   devtool: 'cheap-source-map'
   ```

2. **`cheap-module-source-map`：**

   - 生成的 Source Map 包含模块信息，可以追踪到具体的模块路径和文件，提供了更详细的信息。
   - 相比于 `cheap-source-map`，生成的 Source Map 体积略大，但仍然保持相对较小。
   - 适用于需要查看模块信息的场景，对于分析模块之间关系和定位问题更有帮助。

   ```js
   devtool: 'cheap-module-source-map'
   ```

总的来说，主要区别在于是否包含模块信息。如果你对模块信息不感兴趣，而希望保持较小的文件体积，可以选择使用 `cheap-source-map`。如果你需要查看模块信息，了解模块之间的关系，可以选择使用 `cheap-module-source-map`。根据具体的调试需求和性能要求来选择适合的 Source Map 配置。

### hidden-source-map

会生成sourcemap，但是不会对source-map文件进行引用； 

相当于删除了打包文件中对sourcemap的引用注释； 

```js
// bundile.js里面被删除掉的
//# sourceMappingURL=bundle.js.map
```

如果我们手动添加进来，那么sourcemap就会生效了

### 多个值的组合

事实上，webpack提供给我们的26个值，是可以进行多组合的。 

1.组合的规则如下： 

 inline-|hidden-|eval：三个值时三选一； 

 nosources：可选值； 

 cheap可选值，并且可以跟随module的值； 

```js
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
```

**2.那么在开发中，最佳的实践是什么呢？** 

I.开发阶段：推荐使用 source-map或者cheap-module-source-map 

​	✓ 这分别是vue和react使用的值，可以获取调试信息，方便快速开发； 

II.测试阶段：推荐使用 source-map或者cheap-module-source-map 

​	✓ 测试阶段我们也希望在浏览器下看到正确的错误提示； 

III.发布阶段：false、缺省值（不写）