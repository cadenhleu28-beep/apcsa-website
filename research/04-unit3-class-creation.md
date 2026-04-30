# Unit 3: Class Creation — Detailed Content

**Exam weight:** 10–18% | **Suggested pacing:** ~20–22 class periods

---

## 3.1 Abstraction and Program Design
- **Data abstraction:** naming data without exposing implementation details
- **Procedural abstraction:** hiding implementation behind method names
- **Instance variables:** unique per object (state)
- **Class variables (`static`):** shared across all objects
- **Method decomposition:** breaking complex problems into smaller methods
- UML class diagrams show: class name, attributes (variables), behaviors (methods)

## 3.2 Impact of Program Design
**Learning Objective 3.2.A** (social/ethical focus):
- Programs can have unintended harmful societal, economic, and cultural effects
- System reliability requires testing under many conditions
- Legal concerns: intellectual property, licensing, open source permissions
- **AI is NOT assessed on the exam** — AI guidance exists in the CED instructional section only

## 3.3 Anatomy of a Class
```java
public class ClassName {
    // instance variables (private)
    private int value;
    private String name;

    // constructors (public)
    public ClassName(int value, String name) {
        this.value = value;
        this.name = name;
    }

    // instance methods
    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
```

Access modifiers:
- `public` — accessible from any class
- `private` — accessible only within this class
- Classes: always `public`
- Constructors: always `public`
- Instance variables: should be `private` (encapsulation)
- Instance methods: `public` for external access, `private` for internal helpers

## 3.4 Constructors
```java
public ClassName(paramType param1, paramType param2) {
    this.field1 = param1;
    this.field2 = param2;
}
```
- Same name as the class
- No return type (not even `void`)
- Called with `new ClassName(args)`
- If no constructor defined, Java provides a default no-arg constructor
- **Constructor overloading:** multiple constructors with different parameter lists

```java
// No-arg constructor
public Dog() {
    this.name = "Unknown";
    this.age = 0;
}

// Parameterized constructor
public Dog(String name, int age) {
    this.name = name;
    this.age = age;
}
```

## 3.5 Methods: How to Write Them
```java
public returnType methodName(paramType param1, ...) {
    // body
    return value; // omit if void
}
```

**Accessor (getter):** returns instance variable value
```java
public int getAge() {
    return age;
}
```

**Mutator (setter):** modifies instance variable value
```java
public void setAge(int age) {
    this.age = age;
}
```

**void method:** performs action, returns nothing
```java
public void display() {
    System.out.println(name + ", age " + age);
}
```

**Precondition:** what must be true when method is called  
**Postcondition:** what is guaranteed true after method completes

## 3.6 Methods: Passing and Returning References of an Object
**Pass-by-value for primitives:**
```java
void addOne(int x) { x++; } // original unchanged
int n = 5;
addOne(n);
// n is still 5
```

**Object references passed by value (the reference is copied):**
```java
void changeName(Dog d) {
    d.setName("Rex"); // affects original object — reference copy points to same object
}
void replaceRef(Dog d) {
    d = new Dog("Max"); // only changes local copy of reference — original unchanged
}
```

**Aliasing:** two variables pointing to the same object
```java
Dog a = new Dog("Spot");
Dog b = a;          // aliased — same object
b.setName("Rex");
// a.getName() now returns "Rex"
```

## 3.7 Class Variables and Methods (static)
```java
public class Counter {
    private static int count = 0; // shared by all Counter objects

    public Counter() {
        count++;
    }

    public static int getCount() { // called as Counter.getCount()
        return count;
    }
}
```
- `static` variables: one copy per class, shared by all instances
- `static` methods: called on the class, not an object (`ClassName.method()`)
- `static` methods cannot access instance variables (no `this`)

## 3.8 Scope and Access
- **Local variable:** declared inside a method; only accessible within that method
- **Instance variable:** declared in the class; accessible in all instance methods
- Parameter names shadow instance variable names (resolved with `this`)
- **`NullPointerException`:** thrown when calling a method on a `null` reference

```java
String s = null;
int len = s.length(); // throws NullPointerException
```

## 3.9 this Keyword
```java
public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x; // 'this.x' = instance variable; 'x' = parameter
        this.y = y;
    }
}
```
- `this` refers to the current object
- Disambiguates instance variables from parameters with the same name
- `this()` calls another constructor in the same class (constructor chaining)

```java
public Dog() {
    this("Unknown", 0); // calls Dog(String, int) constructor
}
public Dog(String name, int age) {
    this.name = name;
    this.age = age;
}
```
