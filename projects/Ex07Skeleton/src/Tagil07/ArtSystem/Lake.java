package Tagil07.ArtSystem;

import java.util.ArrayList;
import java.util.List;
import Tagil07.ArtSystem.ElementVisitor;

public class Lake extends Element {
    private String name;
    private double diameter;
    private List<Element> children;

    public Lake(String name, double diameter, String path) {
        super(diameter, diameter, path);
        this.name = name;
        this.diameter = diameter;
        this.children = new ArrayList<>();
    }

    public void addChild(Element child) {
        // Only allow aquatic or amphibian elements
        Habitat h = child.getHabitat();
        if (h == Habitat.AQUATIC || h == Habitat.AMPHIBIAN) {
            children.add(child);
        } else {
            System.out.println(getName() + " cannot contain " + child.getName());
        }
    }

    public List<Element> getChildren() {
        return children;
    }

    // Area = π * (diameter/2)^2 (circle)
    public double getArea() {
        return Math.PI * Math.pow(diameter / 2.0, 2);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.TERRESTRIAL;
    }

    @Override
    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
        for (Element child : children) {
            child.accept(visitor);
        }
    }
}
