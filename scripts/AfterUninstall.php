<?php

class AfterUninstall
{
    protected $container;

    public function run($container)
    {
        $this->container = $container;

        $this->clearCache();
    }

    protected function clearCache()
    {
        try {
            $this->container->get('dataManager')->clearCache();
        } catch (\Exception $e) {
        }
    }
}