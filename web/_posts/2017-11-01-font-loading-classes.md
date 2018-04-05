---
title: Managing Font Loading CSS Was Painful—Not Anymore
permalink: /font-loading-classes/
categories:
  - font-loading
tags:
  - font-loading
  - project
  - popular-posts
postRank: 7
---

One of the most painful pieces of maintaining a web font loading strategy is meticulously managing the CSS that goes with it. You have to carefully manage the CSS to make sure that any use of your web font `font-family` is protected by a class added by the JS after the fonts have loaded successfully.

{% highlight css %}
body {
  font-family: sans-serif;
}
.fonts-loaded body {
  font-family: Lato, sans-serif;
}
{% endhighlight %}

<span class="caption">From <a href="https://github.com/zachleat/web-font-loading-recipes"><code>zachleat/web-font-loading-recipes</code></a>, specifically the <a href="https://github.com/zachleat/web-font-loading-recipes/blob/master/fout-with-class.html">FOUT with a Class example</a>.</span>

One slip up _anywhere_ in your stylesheet and your web fonts could load with native browser behavior, meaning everything using Lato will FOIT for up to three seconds.

{% highlight css %}
.whoops {
  font-family: Lato;
}
{% endhighlight %}

Well, not anymore. [Mathias Biilmann](https://github.com/biilmann) introduced me to a plugin from Netlify called [`postcss-fout-with-a-class`](https://github.com/netlify/postcss-fout-with-a-class). It post-processes your CSS and automatically transforms it to add the guarding classes. No more mess, no more manual maintenance, no more slip-ups. While Netlify’s excellent plugin was specifically designed to accommodate the FOUT with a Class approach, I wanted something that worked with one or more font loading stages (FOFT).

It is with much 🎉 fanfare 🎉 that I introduce the [`postcss-foft-classes`](https://github.com/zachleat/postcss-foft-classes) plugin.

<span class="primarylink">Check out <a href="https://github.com/zachleat/postcss-foft-classes"><code>postcss-foft-classes</code></a></span>

This will work with one stage font loading (FOUT with a Class) or two stage font loading (FOFT) or any number of loading stages. Gulp configuration examples are included with the README but really this plugin will work anywhere that `postcss` does.

The magic here is that you no longer have any overhead managing the web font `font-family` properties in CSS. You simply write:

{% highlight css %}
body {
  font-family: Lato, sans-serif;
}
{% endhighlight %}

and `postcss-foft-classes` will export this code for a single stage approach (FOUT):

{% highlight css 0-2 %}
body {
  font-family: sans-serif;
}
.fonts-loaded body {
  font-family: Lato;
}
{% endhighlight %}

or `postcss-foft-classes` will export this code for a two stage approach (FOFT):

{% highlight css 0-2 %}
body {
  font-family: sans-serif;
}

.fonts-loaded body {
  font-family: LatoInitial;
}

.fonts-loaded-2 body {
  font-family: Lato;
}
{% endhighlight %}

So much easier.
