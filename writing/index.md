---
layout: panelled
title: Writing
class: writing
---

{% for entry in site.categories %}
# {{ entry[0] | capitalize }}

{% for post in entry[1] %}
* [*{{ post.date | date_to_string }}*{{ post.title }}]({{post.url}})
{% endfor %}

{% endfor %}
