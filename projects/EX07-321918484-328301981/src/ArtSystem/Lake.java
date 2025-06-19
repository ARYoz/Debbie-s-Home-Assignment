package ArtSystem;

import java.util.ArrayList;
import java.util.List;

public class Lake extends Element {
    private String name;
    private double diameter;
    private List<Element> elements;

    public Lake(String name, double diameter, String path) {
        super(diameter, diameter, path);  // width = length = diameter
        this.name = name;
        this.diameter = diameter;
        this.elements = new ArrayList<>();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.AQUATIC;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
        for (Element e : elements) {
            e.accept(visitor);
        }
    }

    @Override
    public double getArea() {
        double radius = diameter / 2.0;
        return Math.PI * radius * radius;
    }

    public boolean addElement(Element element) {
        if (elements.stream().anyMatch(e -> e.getFullName().equals(element.getFullName()))) {
            System.out.println("Already exists in " + getFullName() + ": " + element.getFullName());
            return false;
        }

        if (element.getHabitat() == Habitat.AQUATIC || element.getHabitat() == Habitat.AMPHIBIAN) {
            elements.add(element);
            System.out.println("Lake " + getFullName() + " added: " + element.getFullName());
            return true;
        } else {
            System.out.println(this.getFullName() + " cannot contain " + element.getName());
            return false;
        }
    }




    public List<Element> getElements() {
        return elements;
    }
}

