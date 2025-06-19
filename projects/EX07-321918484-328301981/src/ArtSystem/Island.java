package ArtSystem;

import java.util.ArrayList;
import java.util.List;

public class Island extends Element {

    private String name;
    private double diameter;
    private String path;
    private List<Element> elements;

    public Island(String name, double diameter, String path) {
        super(diameter, diameter, path);
        this.name = name;
        this.diameter = diameter;
        this.path = path;
        this.elements = new ArrayList<>();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.AMPHIBIAN;
    }

    @Override
    public double getArea() {
        // שטח מעגל: π * r^2
        double radius = diameter / 2.0;
        return Math.PI * radius * radius;
    }

    public boolean addElement(Element element) {
        if (elements.stream().anyMatch(e -> e.getFullName().equals(element.getFullName()))) {
            System.out.println("Already exists in " + getFullName() + ": " + element.getFullName());
            return false;
        }

        if (element.getHabitat() == Habitat.TERRESTRIAL || element.getHabitat() == Habitat.AMPHIBIAN) {
            elements.add(element);
            System.out.println("Island " + getFullName() + " added: " + element.getFullName());
            return true;
        } else {
            System.out.println(this.getFullName() + " cannot contain " + element.getName());
            return false;
        }
    }


    public void removeElement(Element e) {
        elements.remove(e);
    }

    public List<Element> getElements() {
        return elements;
    }

    // Visitor
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
        for (Element e : elements) {
            e.accept(visitor);
        }
    }
}
