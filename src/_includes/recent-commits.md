## Recent Commits ({{ recent_commits.commits | size }})

{% for commit in recent_commits.commits %}
- [{{ commit.commit.author.date | date: '%Y-%m-%d' }}] [`{{ commit.sha | slice: 0, 7 }}`]({{ commit.html_url | url }}) {{ commit.commit.message | strip_newlines }}
{%- endfor %}
