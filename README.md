# react-ts-1h5532

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-ts-1h5532)

# Requirement:


Make 5 parallel API calls in one chunk  and repeat that after every 3 secs (for 3 time) till the time 15 API calls are made in total

You can use fake api https://jsonplaceholder.typicode.com/todos/<id>
Keep displaying ids and titles on the page as <li> items as the requests keep resolving
Which means 5 li items will be rendered at once, then next 5 will be appended underneath previous ones and same thing once again.
Once 15 li items are rendered ( 5, 5, 5 ) at a time, stop the process and show an alert on the page saying "done"
