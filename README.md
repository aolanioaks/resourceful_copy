# My Project
## Resource
Book

### Attributes:
- **name** (string)
- **review** (string)
- **pages** (integer)
- **author** (string)
- **isbn** (string)

### Schema
```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    name TEXT,
    review TEXT,
    pages INTEGER,
    author TEXT,
    isbn TEXT
);


### REST Endpoints

| Name                      | Method | Path                  |
|---------------------------|--------|-----------------------|
| Retrieve book collection   | GET    | /books                |
| Retrieve book member       | GET    | /books/<id>           |
| Create book member         | POST   | /books                |
| Update book member         | PUT    | /books/<id>           |
| Delete book member         | DELETE | /books/<id>           |