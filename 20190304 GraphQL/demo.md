---
title: GraphQL
separator: <!--s-->
verticalSeparator: <!--v-->
theme: league
revealOptions:
    transition: fade
---

# GraphQL 初探

<div class="window faux-graphiql" aria-hidden="true"><div class="query"><pre class="prism">{
  hero {
    name<span id="ch0" class="ch" style="display: none;"><br></span><span id="ch1" class="ch" style="display: none;"> </span><span id="ch2" class="ch" style="display: none;"> </span><span id="ch3" class="ch" style="display: none;"> </span><span id="ch4" class="ch" style="display: none;"> </span><span id="ch5" class="ch" style="display: none;">h</span><span id="ch6" class="ch" style="display: none;">e</span><span id="ch7" class="ch" style="display: none;">i</span><span id="ch8" class="ch" style="display: none;">g</span><span id="ch9" class="ch" style="display: none;">h</span><span id="ch10" class="ch" style="display: none;">t</span><span id="ch11" class="ch" style="display: none;"><br></span><span id="ch12" class="ch" style="display: none;"> </span><span id="ch13" class="ch" style="display: none;"> </span><span id="ch14" class="ch" style="display: none;"> </span><span id="ch15" class="ch" style="display: none;"> </span><span id="ch16" class="ch" style="display: none;">m</span><span id="ch17" class="ch" style="display: none;">a</span><span id="ch18" class="ch" style="display: none;">s</span><span id="ch19" class="ch" style="display: none;">s</span><span class="cursor"></span>
  }
}</pre></div><div class="response"><div id="r1" style="display: block;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div><div id="r2" style="display: none;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span><span class="punctuation">,</span>
    <span class="attr-name">"height"</span><span class="punctuation">:</span> <span class="number">1.72</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div><div id="r3" style="display: none;"><pre class="prism language-json"><span class="punctuation">{</span>
  <span class="attr-name">"hero"</span><span class="punctuation">:</span> <span class="punctuation">{</span>
    <span class="attr-name">"name"</span><span class="punctuation">:</span> <span class="string">"Luke Skywalker"</span><span class="punctuation">,</span>
    <span class="attr-name">"height"</span><span class="punctuation">:</span> <span class="number">1.72</span><span class="punctuation">,</span>
    <span class="attr-name">"mass"</span><span class="punctuation">:</span> <span class="number">77</span>
  <span class="punctuation">}</span>
<span class="punctuation">}</span></pre></div></div></div>

Note: reveal-md demo.md  --scripts demo.js,https://www.google-analytics.com/analytics.js  --css demo.css

<!--s-->

## 摘要

1. 概念
2. 语法
3. 使用
4. Util - DAO - Resolver

<!--v-->

### 声明

1. 不关注特别细节的问题
2. 主要面向前端组人员扩展视野
3. 服务端端轻喷


<!--s-->

## 概念

### 前后端结构

<!--v-->

![](./前后端结构.png)

<!--v-->



<!--s-->

THX ~
