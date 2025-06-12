package Tagil07.ArtSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import Tagil07.ArtSystem.ElementVisitor;

public class Painting {
    private String name;
    Map<String, Element> pathToElementMap;
    List<Element> elementList;

    public Painting() {
        elementList = new ArrayList<>();
        pathToElementMap = new HashMap<>();
        this.name = "painting";
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Element> getChildren() {
        return elementList;
    }

    public void addElement(Element element) {
        pathToElementMap.put(element.getFullName(), element);
        if (element.getPath().isEmpty()) {
            elementList.add(element);
        } else {
            Element containingElement = pathToElementMap.get(element.getPath());
            if (containingElement instanceof Lake) {
                ((Lake) containingElement).addChild(element);
            } else if (containingElement instanceof Island) {
                ((Island) containingElement).addChild(element);
            }
        }
    }

    public String getName() {
        return name;
    }

    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
        for (Element e : elementList) {
            e.accept(visitor);
        }
    }
}
