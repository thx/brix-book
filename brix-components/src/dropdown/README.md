# Dropdown

下拉框组件。

```html
<select bx-name="components/dropdown">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3">Something else here</option>
</select>
```

## 配置 Options

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | array | - | 可选。下拉框中的数据。默认从子节点 `<optgroup>` 和 `<option>` 读取。
value | string | - | 可选。下拉框的值。
searchbox | boolean | `false` | 可选。是否开启下拉框中的输入框。可选值有 `false`、`true`、`'enter'`。
popover | boolean or number | `false` | 可选。是否为下拉框的条目配置 `bx-name="components/popover"`。可选值有 `false`、`true`、`width`。

### 配置项 searchbox

Value | Description
:---- | :----------
`false` | 不开启下拉框中的输入框。
`true` | 开启下拉框中的输入框。当输入框的原生 `keyup` 事件被触发时，组件 Dropdown 触发 `search.dropdown` 事件。
`'enter'` | 开启下拉框中的输入框。当在输入框中按下 <kbd>enter</kbd> 键时，组件 Dropdown 触发 `search.dropdown` 事件。

### 配置项 `popover`

Value | Description
:---- | :----------
`false` | 不为下拉框的条目配置 `bx-name="components/popover"`。
`true` | 为下拉框的条目配置 `bx-name="components/popover"`。
`width` | 指定 Popover 浮层的宽度。


## 方法 <small>Methods</small>

### .val( [ value ] )

* .val( value )
* .val( )

设置或读取下拉框的值。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
console.log(instances[0].val())
instances[0].val(2)
console.log(instances[0].val())
```

### .data( [ data ] )

* .data( data )
* .data( )

设置或读取下拉框中的数据。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
console.log(instances[0].data())

instances[0].data([1,2,3])
instances[0].data([1,2,3]).val(3)

instances[0].data([
    { label: 'foo', value: 1 },
    { label: 'bar', value: 2 },
    { label: 'faz', value: 3 }
])
instances[0].data([
    { label: 'foo', value: 1 },
    { label: 'bar', value: 2 },
    { label: 'faz', value: 3 }
]).val(3)
```

## 事件 Events

Event Type | Description
:--------- | :----------
change.dropdown | 当值发生变化时被触发。
search.dropdown | 见配置项 `searchbox`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
instances.on('change.dropdown', function(event, extra) {
    console.log(event, extra)
    // => extra { name: ..., label: ..., value: ... }
})
instances.on('search.dropdown', function(event, seed) {
    console.log(event, seed)
    // => seed 输入值
})
```

## 示例 Examples

**示例 1：**直接在 `select` 节点上附加 `bx-name="components/dropdown"`。

<!-- <iframe width="100%" height="300" src="//jsfiddle.net/hLecvbjh/6/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> -->

```html
<select bx-name="components/dropdown">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3">Something else here</option>
</select>
<select bx-name="components/dropdown" data-value="2">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3">Something else here</option>
</select>
<select bx-name="components/dropdown" data-value="true">
    <option value="">Anything</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
</select>
```

**示例 2：**支持 `optgroup`。

```html
<select bx-name="components/dropdown">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
```

**示例 3：**如果已经有了 JSON 数据，可以直接配置到 `data-data` 属性上，支持 `optgroup`。

```html
<select bx-name="components/dropdown" data-data="[
    {
        label: 'Action',
        value: 1
    }, {
        label: 'Another action',
        value: 2,
        selected: true
    }, {
        label: 'Something else here',
        value: 3
    }
]"></select>
<select bx-name="components/dropdown" data-data="[
    {
        label: 'optgroup 1',
        children: [{
            label: 'Action',
            value: 1
        }]
    }, {
        label: 'optgroup 2',
        children: [{
            label: 'Another action',
            value: 2,
            selected: true
        }]
    }, {
        label: 'optgroup 3',
        children: [{
            label: 'Something else here',
            value: 3
        }]
    }
]"></select>
```

**示例 4：**可以在事件 `change.dropdown` 中对选中的值进行修正。

```html
<select id="conflict" name="conflict" bx-name="components/dropdown">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3">Something else here</option>
</select>
```

```js
var Loader = require('brix/loader')
var conflict = Loader.query($('#conflict'))[0]
conflict.on('change.dropdown', function(event, extra){
    console.log(extra)
    if(extra.value == '3') {
        event.component.val('1')
    }
})
```

**示例 5：**支持分隔线 `<option class="divider"></option>`。

```html
<select bx-name="components/dropdown">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <option class="divider"></option>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
```

**示例 6：**支持搜索框 `data-searchbox="true|enter"`。详细说明见下方的配置项 `searchbox`。

```html
<select bx-name="components/dropdown" data-searchbox="true" bx-search="filter">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <option class="divider"></option>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
<select bx-name="components/dropdown" data-searchbox="enter" bx-search="filter">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <option class="divider"></option>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
```

**示例 7：**支持 Popover `data-popover="true|width"`。

```html
<select bx-name="components/dropdown" data-popover="true">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <option class="divider"></option>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
<select bx-name="components/dropdown" data-popover="200">
    <optgroup label="optgroup 1">
        <option value="1">Action</option>
    </optgroup>
    <optgroup label="optgroup 2">
        <option value="2">Another action</option>
    </optgroup>
    <option class="divider"></option>
    <optgroup label="optgroup 3">
        <option value="3" selected>Something else here</option>
    </optgroup>
</select>
```

**示例 8：**支持设置宽度 `data-width="width"`。

```html
<select bx-name="components/dropdown" data-width="100">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
<select bx-name="components/dropdown" data-width="100px">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
<select bx-name="components/dropdown" data-width="100%">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
```

**示例 9：**支持设置两端对齐 `data-justify="true"`。

```html
<select bx-name="components/dropdown" data-width="100" data-justify="true">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
<select bx-name="components/dropdown" data-width="100px" data-justify="true">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
<select bx-name="components/dropdown" data-width="100%" data-justify="true">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3" selected>Something else here</option>
</select>
```

<!-- 响应式 TODO http://silviomoreto.github.io/bootstrap-select/ -->