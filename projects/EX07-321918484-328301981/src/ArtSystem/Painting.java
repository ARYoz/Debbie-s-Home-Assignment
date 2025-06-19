package ArtSystem;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Painting {
    Map<String, Element> pathToElementMap;
    List<Element> elementList;

    public Painting() {
        elementList = new ArrayList<>();
        pathToElementMap = new HashMap<>();
    }
    public void addElement(Element element) {
        System.out.println("Trying to add: " + element.getFullName());

        if (pathToElementMap.containsKey(element.getFullName())) {
            System.out.println("Already exists globally: " + element.getFullName());
            return;
        }

        if (element.getPath().isEmpty()) {
            elementList.add(element);
            pathToElementMap.put(element.getFullName(), element);
            System.out.println("Added to root elements: " + element.getFullName());
        } else {
            Element parent = pathToElementMap.get(element.getPath());
            if (parent instanceof Lake) {
                if (((Lake) parent).addElement(element)) {
                    pathToElementMap.put(element.getFullName(), element);
                    System.out.println("Registered in map: " + element.getFullName());
                }
            } else if (parent instanceof Island) {
                if (((Island) parent).addElement(element)) {
                    pathToElementMap.put(element.getFullName(), element);
                    System.out.println("Registered in map: " + element.getFullName());
                }
            } else {
                System.out.println((parent != null ? parent.getFullName() : "Unknown") + " cannot contain " + element.getName());
            }
        }
    }



    public String getName() {
        return Painting.class.getSimpleName().toLowerCase();
    }

    public List<Element> getElements() {
        return elementList;
    }

    public void accept(Visitor visitor) {
        for (Element e : elementList) {
            e.accept(visitor);
        }
    }
}
