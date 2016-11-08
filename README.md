## md-list-tree-parser
parse markdown list-style tree to json

### usage
write your tree list with `-` and two spaces * n at front and one space after `-` for each tree-level in your `tree.md`
```
- [level1](someurl)
  - [level2](someurl)
  - [another level2](someurl)
    - [three](....)
      - [four]()
      - [four]
        - [five]
- [no url]
  - [parse to json](url)
  - [another level2](url)

```
then in your js
```
var parser = require('md-list-tree-parser')
var json = parser('./tree.md')
```
### output
```
[
  {
    "title": "level1",
    "link": "someurl",
    "childNodes": [
      {
        "title": "level2",
        "link": "someurl"
      },
      {
        "title": "another level2",
        "link": "someurl",
        "childNodes": [
          {
            "title": "three",
            "link": "....",
            "childNodes": [
              {
                "title": "four",
                "link": ""
              },
              {
                "title": "four",
                "childNodes": [
                  {
                    "title": "five"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "no url",
    "childNodes": [
      {
        "title": "parse to json",
        "link": "url"
      },
      {
        "title": "another level2",
        "link": "url"
      }
    ]
  }
]
```

### more usage
```
var parser = require('md-list-tree-parser')
var text = $('#tree').text()
var json = parser(text, 'text')
```
