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
        pathToElementMap.put(element.getFullName(), element);

        if (element.getPath().isEmpty()) {
            elementList.add(element);
        } else {
            Element containingElement = pathToElementMap.get(element.getPath());

            if (containingElement instanceof Lake) {
                ((Lake) containingElement).addElement(element);
            } else if (containingElement instanceof Island) {
                ((Island) containingElement).addElement(element);
            } else {
                System.out.println(containingElement.getFullName() + " cannot contain " + element.getName());
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
