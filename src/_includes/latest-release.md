## Latest Release

{% assign latest_release = recent_releases.releases | first %}
[{{ latest_release.tag_name }}]({{ latest_release.url | url }}) on <time>{{ latest_release.created_at | date: "%Y-%m-%d" }}</time>
({{ latest_release.created_at | relativeDate }})

### {{ latest_release.name }}

{%- comment %}
  GitHub returns the contents of a release as Markdown apparently, so we use
  our custom `markdown` filter here to convert the markdown content into HTML.
{% endcomment -%}
{{ latest_release.releasenotes_md | markdown }}
